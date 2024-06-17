import {Component, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {HeaderComponent} from "../header/header.component";
import {Task} from "../../models/Task";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {selectEditMode} from "../../store/common/common.selector";
import {editModeState} from "../../store/common/common.reducer";
import {disableEditMode, enableEditMode} from "../../store/common/common.action";
import {Router} from "@angular/router";
import {selectTask} from "../../store/task/task.selector";
import {taskState} from "../../store/task/task.reducer";
import {upsertTaskAsync} from "../../services/task.service";
import UserInfo from "../../models/UserInfo";
import {getUserInfo} from "../../auth/auth";
import {removeTask} from "../../store/task/task.action";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FaIconComponent,
    HeaderComponent,
    FormsModule
  ],
  templateUrl: './task.form.component.html',
  styleUrl: './task.form.component.css'
})
export class TaskFormComponent implements OnInit {
  formTitleName: string = "";
  task: Task = new Task();
  editMode$: Observable<editModeState>;
  task$: Observable<taskState>;

  constructor(private router: Router, private store: Store<AppState>) {
    this.editMode$ = this.store.select(selectEditMode);
    this.task$ = this.store.select(selectTask);
  }

  ngOnInit() {
    this.editMode$.subscribe(editMode => {
      if (editMode.value === true) {
        this.formTitleName = "Edit Task"
      } else {
        this.formTitleName = "Create Task"
      }
    });

    this.task$.subscribe(currentTask => {
      if (currentTask) {
        this.task.id = currentTask?.value?.id;
        this.task.status = currentTask?.value?.status;
        this.task.taskName = currentTask?.value?.taskName;
        this.task.priority = currentTask?.value?.priority;
        this.task.description = currentTask?.value?.description;
        this.task.expiredDate = currentTask?.value?.expiredDate;
        this.task.userId = currentTask?.value?.userId;
      }
    });
  }

  taskNameChange = (value: any) => {
    this.task.taskName = value;
  }

  descriptionChange = (value: any) => {
    this.task.description = value;
  }

  priorityChange = (value: any) => {
    this.task.priority = value;
  }

  statusChange = (value: any) => {
    this.task.status = value;
  }

  expiredDateChange = (value: any) => {
    this.task.expiredDate = value;
  }

  onClickSubmit = async (task: Task) => {
    this.editMode$.subscribe(editMode => {
      if (editMode.value === true) {
        this.store.dispatch(disableEditMode());
      }else {
        const userInfo: UserInfo = JSON.parse(getUserInfo() || "{}");
        task.userId = userInfo.id;
      }

      upsertTaskAsync(task).then(response => {
        if (response) {
          this.store.dispatch(removeTask());
          this.router.navigate(['/tasks']);
        }
      });
    });
  }
}
