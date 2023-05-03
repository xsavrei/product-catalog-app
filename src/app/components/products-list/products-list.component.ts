import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { combineLatest, of, startWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, SortingOption } from '../../domain/main.domain';
import { PartialRootState, selectAllProducts, selectProductsByCategoryId } from '../../store';

@UntilDestroy()
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnChanges {

  @Input()
  categoryId?: string;

  @Input()
  sortingOption?: SortingOption;

  @Input()
  filterValue?: string;
  products?: Product[];
  copyProducts?: Product[];

  constructor(private store: Store<PartialRootState>) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filterValue.currentValue || changes.filterValue.currentValue === '') {
      combineLatest([
        this.store.select(selectAllProducts),
        of(this.filterValue).pipe(startWith(''))
      ]).pipe(
        map(([products, filterValue]) => {
          return products?.filter(product => product.name?.toUpperCase().includes(filterValue?.toUpperCase() || ''))
        })
      ).subscribe(res => {
        this.products = res;
        this.copyProducts = res;
      });
    }
    if (changes.categoryId?.currentValue) {
      this.store.select(selectProductsByCategoryId(this.categoryId)).subscribe(res => {
        this.products = res;
        this.copyProducts = res;
      });
    } else if (changes.categoryId && !this.categoryId) {
      this.store.select(selectAllProducts).subscribe(res => {
        this.products = res;
        this.copyProducts = res;
      });
    }
    if (this.products) {
      if (changes.sortingOption?.currentValue) {
        const copyToSort: Product[] = JSON.parse(JSON.stringify(this.products));
        if (this.sortingOption === SortingOption.NAME) {
          this.products = copyToSort.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
        }
        if (this.sortingOption === SortingOption.PRICE) {
          this.products = copyToSort.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        }
      } else if (!changes.sortingOption?.currentValue && !this.sortingOption) {
        this.products = this.copyProducts;

      }
    }
  }
}


