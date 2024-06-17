import {createReducer, on} from '@ngrx/store';
import {Task} from "../../models/Task";
import {addTask, filterTask, removeTask} from "./task.action";

export interface taskState {
  value: Task | undefined;
  filter: any | {
    status: string,
    priority: string
  }
}

export const initialState: taskState = {
  value: undefined,
  filter: {}
}

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, {task}) => {
    return {
      ...state,
      value: task
    }
  },),
  on(removeTask, (state) => {
    return {
      ...state,
      value: undefined
    }
  }),
  on(filterTask, (state, {status, priority}) => {
    state.filter.status = status;
    state.filter.priority = priority;

    return {
      ...state,
      filter: state.filter
    }
  }),
);
