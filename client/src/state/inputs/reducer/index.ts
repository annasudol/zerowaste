import { actionFillInputs, actionClearInputs } from '../actions';
import { createReducer } from '@reduxjs/toolkit';
import { RecipeStateProps } from "../../../utils/types"


const initialState = {
  title: "",
  servings: 0,
  image: "",
  readyInMinutes: 0,
  ingredients: [],
  detailedIngredients: [],
  instructions: "",
  sourceUrl: undefined
}

export const inputs = createReducer<RecipeStateProps>(initialState, {
  [actionFillInputs.type]: (state, action) => {
    if (actionFillInputs.match(action)) {
      return {
        ...state,
        ...action.payload
      };
    }
    return state;
  },
  [actionClearInputs.type]: () => initialState,
});

export default inputs;
