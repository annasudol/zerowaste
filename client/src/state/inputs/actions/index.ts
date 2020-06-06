import { AppThunk } from '../../store';
import { INPUTS } from '../constants';
import { createAction } from '@reduxjs/toolkit';
import { RecipeStateProps } from "../../../utils/types"
export const actionFillInputs = createAction(INPUTS.fill, (data: RecipeStateProps) => ({
  payload: data,
}));


export const actionClearInputs = createAction(INPUTS.clear);

export function fillInputs(query: RecipeStateProps): AppThunk {
  return (dispatch): void => {
    dispatch(actionFillInputs(query));
  };
}

export function clearInputs(): AppThunk {
  return (dispatch): { payload: undefined; type: string } => dispatch(actionClearInputs());
}
