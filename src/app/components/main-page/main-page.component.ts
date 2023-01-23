import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import {
  PartialRootState,
  ProductCatalogActions,
  ProductCatalogState,
  selectAllCategories,
  selectAllProducts,
  selectState
} from '../../store';
import { Category, Product } from '../../domain/main.domain';
import { Store } from '@ngrx/store';

@UntilDestroy({ arrayName: 'subscriptions' })
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  private subscriptions?: Subscription[];

  categories?: Category[];
  products?: Product[];
  state?: ProductCatalogState;

  constructor(private store: Store<PartialRootState>) {
    this.store.dispatch(ProductCatalogActions.actions.getCategories());
    this.store.dispatch(ProductCatalogActions.actions.getProducts());


    this.subscriptions = [
      this.store.select(selectState).subscribe(res => this.state = res),
      this.store.select(selectAllProducts).subscribe(res => {
        this.products = res
      }),
      this.store.select(selectAllCategories).subscribe(res => {
        this.categories = res
      })
    ];
  }
}
