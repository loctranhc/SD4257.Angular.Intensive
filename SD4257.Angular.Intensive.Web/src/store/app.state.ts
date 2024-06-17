import {editModeState} from "./common/common.reducer";
import {taskState} from "./task/task.reducer";

export interface AppState {
  editMode: editModeState,
  task: taskState,
}
