import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {loginAsync} from "../../services/user.service";
import {USER_INFO} from "../../services/constants";
import {setUser} from "../../auth/auth";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName: string = "";
  password: string = "";
  constructor(private router: Router) {}

  onClickLogin = async ()=>{
    var response = await loginAsync(this.userName, this.password);
    if(response?.data)
    {
      setUser({
        userName: response.data.userName,
        password: response.data.password,
        fullName: response.data.fullName,
        id: response.data.id
      })

      this.router.navigate(['/']);
    }else{
      alert("Login Failed");
    }
  }
}
