import { AppState } from '../app.state';

export const selectTask = (state: AppState) => state.task;
export const selectFilter = (state: AppState) => state.task.filter;
