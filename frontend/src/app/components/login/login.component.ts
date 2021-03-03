import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { authService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare var M: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, public auth: authService, private router: Router) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    })
  }

  get userName() { return this.form.get('userName'); }
  get password() { return this.form.get('password') };

  login(form: FormGroup) {
    this.auth.login(form.value.userName, form.value.password).subscribe(data => {
      localStorage.setItem('isLogged', '1');
      localStorage.setItem('token', data['accessToken']);
      this.router.navigate(['api/employees']);
    }), (err) => {
      M.toast({ html: 'An error has ocurred!' });
    };
  }
}
