import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PartialRootState, ProductCatalogActions, selectProductById } from '../../store';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Product } from '../../domain/main.domain';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsEditFormComponent } from '../products-edit-form/products-edit-form.component';

@UntilDestroy({ arrayName: 'subscriptions' })
@Component({
  selector: 'app-products-detail-page',
  templateUrl: './products-detail-page.component.html',
  styleUrls: ['./products-detail-page.component.scss']
})
export class ProductsDetailPageComponent {

  productId?: string;
  product?: Product;

  private subscriptions?: Subscription[];

  constructor(private store: Store<PartialRootState>,
              private route: ActivatedRoute,
              private modalService: NgbModal) {

    this.subscriptions = [
      this.route.params.subscribe(params => {
        this.productId = params['id']
      }),
      this.store.select(selectProductById(this.productId)).subscribe(product => {
        this.product = product;
      })
    ]
  }

  onOpenDialog() {
    const modal = this.modalService.open(ProductsEditFormComponent, { size: 'lg' });
    if (this.product) {
      modal.componentInstance.product = this.product
    }
    modal.result.then(res => this.onEditSave(res))
  }

  onEditSave(product: Product) {
    this.store.dispatch(ProductCatalogActions.actions.editProduct({ productEdited: product }));
  }

}
