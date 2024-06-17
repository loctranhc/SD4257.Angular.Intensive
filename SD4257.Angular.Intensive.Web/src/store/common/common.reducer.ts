import { createReducer, on } from '@ngrx/store';
import {disableEditMode, enableEditMode} from "./common.action";

export interface editModeState {
  value: boolean | undefined;
}

export const initialState: editModeState = {
  value: false,
};

export const editModeReducer = createReducer(
  initialState,
  on(enableEditMode, (state) => {
    return {
      ...state,
      value: true
    }
  },),
  on(disableEditMode, (state) => {
    return {
      ...state,
      value: false
    }
  })
);
