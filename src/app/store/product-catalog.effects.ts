import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductCatalogActions } from './index';
import { map, mergeMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { Category, Product } from '../domain/main.domain';

@Injectable()
export class ProductCatalogEffects {

  constructor(private actions$: Actions,
              private apiService: ApiService) {
  }

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductCatalogActions.actions.getCategories),
      mergeMap(() => this.apiService.getCategoryList().pipe(
        map((response: Category[]) =>
          ProductCatalogActions.actions.getCategoriesSuccess({ response }))
      ))
    )
  );

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductCatalogActions.actions.getProducts),
      mergeMap(() => this.apiService.getProductList().pipe(
        map((response: Product[]) =>
          ProductCatalogActions.actions.getProductsSuccess({ response }))
      ))
    )
  );
}
