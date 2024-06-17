import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {TaskListComponent} from "./task.list/task.list.component";
import {TaskFormComponent} from "./task.form/task.form.component";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign.up/sign.up.component";
import {StoreModule} from "@ngrx/store";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TaskListComponent, TaskFormComponent, LoginComponent, SignUpComponent, StoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'SD4257.Angular.Intensive';
}
