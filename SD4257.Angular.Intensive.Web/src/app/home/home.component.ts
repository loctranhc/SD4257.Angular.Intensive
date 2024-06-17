import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {TaskListComponent} from "../task.list/task.list.component";
import {Router, RouterOutlet} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    TaskListComponent,
    RouterOutlet,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  onClickGetStarted = ()=>{
    this.router.navigate(['/tasks']);
  }
}
