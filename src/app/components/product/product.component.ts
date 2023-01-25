import { Component, Input } from '@angular/core';
import { Product } from '../../domain/main.domain';
import { PartialRootState, ProductCatalogActions } from '../../store';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input()
  product?: Product;

  categoryId?: string

  constructor(private store: Store<PartialRootState>,
              private router: Router,
              private route: ActivatedRoute) {
    this.categoryId = this.route.snapshot.params['categoryId'];
  }

  onClickDelete(id: string | undefined) {
    if (id) {
      this.store.dispatch(ProductCatalogActions.actions.deleteProductById({ id: id }));
    }
  }

  onClickDetail(id: string | undefined) {
    if(!this.categoryId){
      if(this.product?.categoryId){
        this.router.navigate([`${this.product.categoryId}/product/${id}`], { relativeTo: this.route })
      }
    }
    if (id && this.categoryId) {
      this.router.navigate([`product/${id}`], { relativeTo: this.route })
    }
  }
}
