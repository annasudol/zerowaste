import { AppThunk } from '../../store';
import { PRODUCTS } from '../constants';
import { createAction } from '@reduxjs/toolkit';

export const actionCreateProductsListSuccess = createAction(PRODUCTS.add, (data: string[]) => ({
  payload: data,
}));


export const actionClearProductsList = createAction(PRODUCTS.clear);

export function createProductsList(query: string[]): AppThunk {
  return (dispatch): void => {
    dispatch(actionCreateProductsListSuccess(query));
  };
}

export function clearProductsList(): AppThunk {
  return (dispatch): { payload: undefined; type: string } => dispatch(actionClearProductsList());
}
