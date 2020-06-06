import { combineReducers } from '@reduxjs/toolkit';
import products from './products/reducer';
import inputs from './inputs/reducer';


export const rootReducer = combineReducers({ products, inputs });

export type RootState = ReturnType<typeof rootReducer>;
