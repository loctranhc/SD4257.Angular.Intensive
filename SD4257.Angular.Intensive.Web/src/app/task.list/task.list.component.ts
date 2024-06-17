import {Component} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TaskItemComponent} from "../task.item/task.item.component";
import {HeaderComponent} from "../header/header.component";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {disableEditMode} from "../../store/common/common.action";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {filterTask, removeTask} from "../../store/task/task.action";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FontAwesomeModule, TaskItemComponent, HeaderComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './task.list.component.html',
  styleUrl: './task.list.component.css'
})
export class TaskListComponent {
  status: string = 'New';
  priority: string = 'High';

  constructor(private router: Router, private store: Store<AppState>) {
  }

  statusChange = (value: any) => {
    this.status = value;
    this.store.dispatch(filterTask({
      status: this.status,
      priority: this.priority
    }));
  }

  priorityChange = (value: any) => {
    this.priority = value;
  }

  onClickNewTask = () => {
    this.store.dispatch(disableEditMode());
    this.store.dispatch(removeTask());
    this.router.navigate(['tasks/form']);
  }
}
