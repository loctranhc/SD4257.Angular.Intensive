import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {enableEditMode} from "../../store/common/common.action";
import {Task} from "../../models/Task";
import UserInfo from "../../models/UserInfo";
import {getUserInfo} from "../../auth/auth";
import {getTasksByUserIdAsync, removeTaskAsync, upsertTaskAsync} from "../../services/task.service";
import {CommonModule} from "@angular/common";
import {addTask, removeTask} from "../../store/task/task.action";
import {Observable} from "rxjs";
import {taskState} from "../../store/task/task.reducer";
import {selectFilter} from "../../store/task/task.selector";

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.item.component.html',
  styleUrl: './task.item.component.css'
})

export class TaskItemComponent implements OnInit {
  tasks: Task[] = [];
  filter$: Observable<any>;

  constructor(private router: Router, private store: Store<AppState>) {
    this.filter$ = this.store.select(selectFilter);
  }

  ngOnInit() {
    this.filter$.subscribe(filter => {
      const userInfo: UserInfo = JSON.parse(getUserInfo() || "{}");
      const status = filter.status;
      const priority = filter.priority;

        getTasksByUserIdAsync(userInfo.id, status, priority).then(response => {
          response?.data?.map((task: Task) => {
            this.tasks.push(task);
          });
        });
    });
  }

  onClickEdit = (task: Task) => {
    this.store.dispatch(enableEditMode());
    this.store.dispatch(addTask({task}));
    this.router.navigate(['tasks/form']);
  }

  onClickRemove = async (task: Task) => {
    const result = confirm("Are you want to remove this task?");
    if (result) {
      await removeTaskAsync(task.id ?? 0);
      window.location.reload();
    }
  }
}
