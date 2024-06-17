import {createAction, props} from '@ngrx/store';
import {Task} from "../../models/Task";

export const addTask = createAction('AddTask', props<{task: Task}>());
export const removeTask = createAction('RemoveTask');
export const filterTask = createAction('FilterTask', props<{status: string, priority: string}>());
