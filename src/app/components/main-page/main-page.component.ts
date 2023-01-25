import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, Subscription } from 'rxjs';
import { PartialRootState, selectActiveCategoryById, selectAllCategories } from '../../store';
import { Category, Product, SortingOption } from '../../domain/main.domain';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { CategoryNode } from '../category-list/category-list.component';

@UntilDestroy({ arrayName: 'subscriptions' })
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {


  private subscriptions?: Subscription[];

  categories?: Category[];
  activeCategory?: Observable<string | undefined>;
  currentCategoryId?: string;
  categoriesTree?: CategoryNode[];
  productsToDisplay?: Product[];
  sortingOption?: SortingOption;

  constructor(private store: Store<PartialRootState>, private route: ActivatedRoute) {

    this.subscriptions = [
      this.store.select(selectAllCategories).subscribe(res => {
        this.categories = res
      }),
      this.route.params.subscribe(params => {
          this.currentCategoryId = params['categoryId'];
          this.activeCategory = this.store.select(selectActiveCategoryById(this.currentCategoryId))
        }
      )
    ];
  }

  public get sortingOptions(): typeof SortingOption {
    return SortingOption;
  }

  onSortingOptionChange(sort: string) {
    this.sortingOption = SortingOption[sort as keyof typeof SortingOption];
  }
}

