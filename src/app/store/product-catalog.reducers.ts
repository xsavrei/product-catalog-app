import { Action, ActionReducer, ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { initialState, ProductCatalogState } from './product-catalog.state';
import { ProductCatalogActions } from './index';
import { environment } from '../../environments/environment';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface State {
}

export const reducers: ActionReducerMap<State> = {};
export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];


export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const productCatalogReducer = createReducer(
  initialState,

  on(
    ProductCatalogActions.actions.getCategoriesSuccess,
    (state, { response }) => new ProductCatalogState({ ...state, categories: response })
  ),

  on(
    ProductCatalogActions.actions.getProductsSuccess,
    (state, { response }) => new ProductCatalogState({ ...state, products: response })
  ),
);

export function reducer(state: ProductCatalogState | undefined, action: Action) {
  return productCatalogReducer(state, action);
}
