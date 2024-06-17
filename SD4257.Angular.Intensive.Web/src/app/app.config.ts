import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {editModeReducer} from "../store/common/common.reducer";
import {taskReducer} from "../store/task/task.reducer";

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideZoneChangeDetection({eventCoalescing: true}),
      provideRouter(routes),
      provideStore(),
      provideState({
        name: 'editMode',
        reducer: editModeReducer,
      }),
      provideState({
        name: 'task',
        reducer: taskReducer,
      })
    ]
};
