import { createAction, props } from '@ngrx/store';
import { Category, Product } from '../domain/main.domain';

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
    props<{ response: Product[] }>()
  ),

  deleteProductById: createAction(
    actionTag('remove product by id from store'),
    props<{ id: string }>()
  ),

  editProduct: createAction(
    actionTag('save edited product'),
    props<{ productEdited: Product }>()
  ),

}
