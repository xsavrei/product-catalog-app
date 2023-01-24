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

export const selectProductsByCategoryId = (id: string | undefined) => createSelector(
  selectProductCatalogState,
  (state: ProductCatalogState) => {
    return state.products?.filter((product) => product.categoryId === id);
  }
)
