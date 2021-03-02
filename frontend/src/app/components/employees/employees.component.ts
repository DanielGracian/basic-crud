import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee';


declare var M: any;
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [EmployeeService]
})

export class EmployeesComponent implements OnInit {
  /*
    createFormGrup(){
      return new FormGroup({
          name: new FormControl(''),
          position: new FormControl(''),
          office: new FormControl(''),
          salary: new FormControl(''),
      })
    }
  */
  form: FormGroup;
  selectedEmployee: Employee;

  constructor(private fb: FormBuilder, public employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.getEmployees();

    this.form = this.fb.group({
      id: [null, []],
      name: [null, [Validators.required, Validators.minLength(4)]],
      position: [null, [Validators.required, Validators.minLength(4)]],
      office: [null, [Validators.required, Validators.minLength(4)]],
      salary: [null, [Validators.required]],
    });
  }

  get name() { return this.form.get('name'); }
  get position() { return this.form.get('position'); }
  get office() { return this.form.get('office'); }
  get salary() { return this.form.get('salary'); }

  addEmployee(form: FormGroup) {

    if (form.value.id) {

      this.selectedEmployee = new Employee(form.value.id, form.value.name, form.value.position,
        form.value.office, form.value.salary);

      this.employeeService.putEmployee(this.selectedEmployee)
        .subscribe(res => {
          form.reset();
          this.getEmployees();
          M.toast({ html: 'Edited successfully!' })
        });

    } else {

      this.selectedEmployee = new Employee('', form.value.name, form.value.position,
        form.value.office, form.value.salary);

      this.employeeService.postEmployee(this.selectedEmployee)
        .subscribe(res => {
          form.reset();
          this.getEmployees();
          M.toast({ html: 'Save successfully!' })
        });

    }
  }

  resetForm() {
    this.form.reset();
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(res => {
        this.employeeService.employees = res as Employee[];
      }), (err) => {
        M.toast({ html: 'An error has ocurred!' });
      };
  }

  setDataIntoForm(data: Employee, form: FormGroup) {
    form.controls['id'].setValue(data._id);
    form.controls['name'].setValue(data.name);
    form.controls['position'].setValue(data.position);
    form.controls['office'].setValue(data.office);
    form.controls['salary'].setValue(data.salary);
  }

  deleteEmployee(id: String) {
    if (confirm('Are you sure you want to delete it?')) {
      this.employeeService.deleteEmployee(id)
        .subscribe(res => {
          this.getEmployees();
          M.toast({ html: 'Employee deleted!' });
        }), (err) => {
          M.toast({ html: 'An error has ocurred!' });
        };
    }
  }
}
