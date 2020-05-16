import { actionCreateProductsListSuccess, actionClearProductsList } from '../actions';
import { createReducer } from '@reduxjs/toolkit';

const products = createReducer<string[]>([], {
  [actionCreateProductsListSuccess.type]: (state, action) => {
    return [...action.payload];

  },
  [actionClearProductsList.type]: () => [],
});

export default products;
