import { Category, Product } from '../domain/main.domain';

export const productCatalogFeatureKey = 'productCatalog';

export class ProductCatalogState {
  categories?: Category[];
  products?: Product[];

  constructor(copy?: ProductCatalogState) {
    Object.assign(this, copy);
  }
}

export interface PartialRootState {
  [productCatalogFeatureKey]: ProductCatalogState;
}


export const initialState = new ProductCatalogState();
