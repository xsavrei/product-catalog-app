import { Component, Input } from '@angular/core';
import { Product } from '../../domain/main.domain';
import { PartialRootState, ProductCatalogActions } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input()
  product?: Product;

  constructor(private store: Store<PartialRootState>) {}

  onClickDelete(id: string | undefined) {
    if (id) {
      this.store.dispatch(ProductCatalogActions.actions.deleteProductById({ id: id }));
    }
  }
}
