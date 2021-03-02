import { Component } from '@angular/core';
import { authService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'frontend';

  isLogin(){
   
    if(localStorage.getItem('isLogged') && localStorage.getItem('isLogged') == '1'){
      return true;
    }
    return false;
  }
}
