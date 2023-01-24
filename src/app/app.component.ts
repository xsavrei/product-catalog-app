import { Component } from '@angular/core';
import { PartialRootState, ProductCatalogActions } from './store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'product-catalog-app';

  constructor(private store: Store<PartialRootState>) {
    // chcem to zavolat iba raz na zaciatku alebo pri plnom reloade stranky - pre moznost lokalnych uprav
    this.store.dispatch(ProductCatalogActions.actions.getCategories());
    this.store.dispatch(ProductCatalogActions.actions.getProducts());
  }
}
