import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {upsertAsync} from "../../services/user.service";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './sign.up.component.html',
  styleUrl: './sign.up.component.css'
})
export class SignUpComponent {
  fullName: string = '';
  userName: string = '';
  password: string = '';

  constructor(private route: Router) {
  }
  
  onFullNameChange = (value: any) => {
    this.fullName = value;
  }

  onUserNameChange = (value: any) => {
    this.userName = value;
  }

  onPasswordChange = (value: any) => {
    this.password = value;
  }
  
  onClickSubmit = ()=>{
    upsertAsync(this.fullName, this.userName, this.password).then(respone => {
      if(respone.status === 200){
        this.route.navigate(['/login']);
      }else {
        alert(respone.statusText);
      }
    }).catch(error => {
      console.log(error);
    });
  }
}
