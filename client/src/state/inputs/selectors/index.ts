import { AppState } from '../../store';
import { RecipeStateProps } from "../../../utils/types"

export function getInputs(state: AppState): RecipeStateProps {
  return state.inputs;
}
