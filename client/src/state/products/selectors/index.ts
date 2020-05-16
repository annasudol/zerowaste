import { AppState } from '../../store';

export function getProducts(state: AppState): string[] | [] {
  return state.products;
}
