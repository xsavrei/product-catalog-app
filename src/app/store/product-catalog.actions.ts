import { createAction, props } from '@ngrx/store';
import { Category } from '../domain/main.domain';

const actionTag = (action: string) => '[PC] - ' + action;

export const actions = {

  getCategories: createAction(
    actionTag('API get categories')
  ),

  getCategoriesSuccess: createAction(
    actionTag('API get categories SUCCESS'),
    props<{ response: Category[] }>()
  ),

  getProducts: createAction(
    actionTag('API get products')
  ),

  getProductsSuccess: createAction(
    actionTag('API get products SUCCESS'),
    props<{ response: Category[] }>()
  ),

  deleteProductById: createAction(
    actionTag('remove product by id from store'),
    props<{ id: string }>()
  )

}
