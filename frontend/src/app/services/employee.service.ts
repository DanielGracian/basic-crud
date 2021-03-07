import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Employee } from '../models/employee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  selectedEmployee: Employee;
  employees: Employee[];

  constructor(private http: HttpClient) { 
    this.selectedEmployee = new Employee();
  }

  getEmployees(){
    return this.http.get(environment.server_api, {headers})
  }
  
  postEmployee(employee: Employee){
    return this.http.post(environment.server_api, employee,{headers})
  }

  putEmployee(employee: Employee){
    return this.http.put(environment.server_api + '/' + employee._id, employee)
  }

  deleteEmployee(id: String){
    return this.http.delete(environment.server_api + '/' + id)
  }
}

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'authorization': 'Bearer ' + localStorage.getItem('token')
})
