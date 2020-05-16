/* eslint-disable no-undef */
import { Action, configureStore } from '@reduxjs/toolkit';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { RootState, rootReducer } from './rootReducer';

export const store = configureStore({ reducer: rootReducer });

// if (process.env.NODE_ENV === 'development') {
//   // module.hot.accept('./rootReducer', () => {
//   //   const newRootReducer = require('./rootReducer').default;

//   //   store.replaceReducer(newRootReducer);
//   // });
// }

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppThunkDispatch = ThunkDispatch<RootState, null, Action<string>>;
