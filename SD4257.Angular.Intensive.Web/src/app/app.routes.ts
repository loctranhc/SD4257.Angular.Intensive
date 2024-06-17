import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign.up/sign.up.component";
import {HomeComponent} from "./home/home.component";
import {TaskFormComponent} from "./task.form/task.form.component";
import {TaskListComponent} from "./task.list/task.list.component";
import {AuthGuard} from "../auth/auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tasks/form',
    component: TaskFormComponent,
    canActivate: [AuthGuard]
  }
];
