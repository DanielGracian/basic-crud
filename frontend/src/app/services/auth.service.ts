import { Injectable, ɵConsole } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Login } from '../models/loginData';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class authService {
  
  loginData: Login;
  constructor(private http: HttpClient) { }
   
  login(email, password){
    this.loginData = new Login(email, password)
    return this.http.post(environment.server_api + 'login', this.loginData, {responseType: 'json'});        
  }
}

