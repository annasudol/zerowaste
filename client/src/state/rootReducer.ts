import { combineReducers } from '@reduxjs/toolkit';
import products from './products/reducer';


export const rootReducer = combineReducers({ products });

export type RootState = ReturnType<typeof rootReducer>;
