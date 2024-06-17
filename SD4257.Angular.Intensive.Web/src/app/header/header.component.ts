import {Component} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faAppleWhole} from '@fortawesome/free-solid-svg-icons';
import {Router, RouterLink} from "@angular/router";
import {USER_INFO} from "../../services/constants";
import {getUserInfo, isAuthenticated, removeUser} from "../../auth/auth";
import UserInfo from '../../models/UserInfo';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [FontAwesomeModule, RouterLink]
})

export class HeaderComponent {
  constructor(private router: Router){}

  userInfo: UserInfo = JSON.parse(getUserInfo() ?? "{}");
  faAppleWhole = faAppleWhole;

  onClickSignUp = () => {
    this.router.navigate(['/sign-up']);
  }

  onClickLogin = () => {
    this.router.navigate(['/login']);
  }


  protected readonly isAuthenticated = isAuthenticated;
  protected readonly removeUser = removeUser;
  protected readonly getUserInfo = getUserInfo;
}
