import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { filter, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PartialRootState, selectActiveCategoryById, selectAllCategories } from '../../store';
import { Category, Product, SortingOption } from '../../domain/main.domain';
import { Store } from '@ngrx/store';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
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
  filterValue?: string;

  constructor(private store: Store<PartialRootState>, private route: ActivatedRoute,
              private router: Router) {

    this.subscriptions = [
      this.store.select(selectAllCategories).subscribe(res => {
        this.categories = res
      }),
      this.route.params.subscribe(params => {
          this.currentCategoryId = params['categoryId'];
          this.activeCategory = this.store.select(selectActiveCategoryById(this.currentCategoryId))
        }
      ),
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => Boolean(event instanceof NavigationEnd)))
        .subscribe(event => {
          if (event) {
            this.filterValue = '';
          }
        })
    ];
  }

  public get sortingOptions(): typeof SortingOption {
    return SortingOption;
  }

  onSortingOptionChange(sort: string) {
    this.sortingOption = SortingOption[sort as keyof typeof SortingOption];
  }
}

