import { actionCreateProductsListSuccess, actionClearProductsList } from '../actions';
import { createReducer } from '@reduxjs/toolkit';

const products = createReducer<string[]>([], {
  [actionCreateProductsListSuccess.type]: (state, action) => {
    return [...state, ...action.payload];

  },
  [actionClearProductsList.type]: () => [],
});

export default products;
