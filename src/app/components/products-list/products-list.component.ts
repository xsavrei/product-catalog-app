import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../domain/main.domain';
import { Store } from '@ngrx/store';
import { PartialRootState, selectAllProducts, selectProductsByCategoryId } from '../../store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnChanges {

  @Input()
  categoryId?: string;

  products?: Product[];

  constructor(private store: Store<PartialRootState>) {
    if (!this.categoryId) {
      this.store.select(selectAllProducts).pipe(untilDestroyed(this))
        .subscribe(products => this.products = products);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryId']?.currentValue) {
      this.store.select(selectProductsByCategoryId(this.categoryId)).pipe(untilDestroyed(this))
        .subscribe(products => this.products = products);
    }
  }


}
