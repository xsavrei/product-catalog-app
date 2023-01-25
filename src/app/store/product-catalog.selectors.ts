import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productCatalogFeatureKey, ProductCatalogState } from './product-catalog.state';

export const selectProductCatalogState = createFeatureSelector<ProductCatalogState>(productCatalogFeatureKey);

export const selectState = createSelector(
  selectProductCatalogState,
  (state: ProductCatalogState) => state
);

export const selectAllCategories = createSelector(
  selectProductCatalogState,
  (state: ProductCatalogState) => state.categories
);

export const selectActiveCategoryById = (id: string | undefined) => createSelector(
  selectProductCatalogState,
  (state: ProductCatalogState) => state.categories?.find(category => category.id === id)?.name
);

export const selectAllProducts = createSelector(
  selectProductCatalogState,
  (state: ProductCatalogState) => state.products
);
//FIXME upravit tak aby pri vybere kategorie 2 ukazali sa produkty aj z 2.1, 2.2, 2.2.1
export const selectProductById = (id: string | undefined) => createSelector(
  selectProductCatalogState,
  (state: ProductCatalogState) => {
    return state.products?.find((product) => product.id === id);
  }
);

export const selectProductsByCategoryId = (id: string | undefined) => createSelector(
  selectProductCatalogState,
  (state: ProductCatalogState) => {
    return state.products?.filter((product) => product.categoryId === id);
  }
);
