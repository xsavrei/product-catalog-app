import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product, SortingOption } from '../../domain/main.domain';
import { Store } from '@ngrx/store';
import { PartialRootState, selectAllProducts, selectProductsByCategoryId } from '../../store';
import { UntilDestroy } from '@ngneat/until-destroy';

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

    products?: Product[];
    copyProducts?: Product[];

    constructor(private store: Store<PartialRootState>) {
    }

    ngOnChanges(changes: SimpleChanges): void {
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

    /* FIXME problem s realizaciou
     findAllNestedCategoriesIds(categoryId: string, categoryTree: CategoryNode[]): string | undefined {
        for (let category of categoryTree) {
          if (category.id === categoryId) {
            if (category.children && category.children.length > 0) {
              for (let children of category.children) {
                if (children.id && children.children) {
                  this.findAllNestedCategoriesIds(children.id, category.children)
                }
              }
            }
          }
        }
        return ''
      }

      filterProductsByCategoryId(categoryId: string, products: Product[]): Product[] {
        return products.filter(product => product.categoryId === categoryId);
      }*/
}


