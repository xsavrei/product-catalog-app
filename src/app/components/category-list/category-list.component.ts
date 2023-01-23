import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Category } from '../../domain/main.domain';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

interface CategoryNode {
  id: string;
  name: string;
  children?: CategoryNode[];
}

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: string;
}

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnChanges {

  @Input()
  categories?: Category[];
  treeData?: CategoryNode[] | undefined;

  private _transformer = (node: CategoryNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id: node.id
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories'].currentValue) {
      this.treeData = this.findChildrenCategories(this.categories);
      this.dataSource.data = this.treeData ?? [];
    }
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  findChildrenCategories(arr: Category[] | undefined, parentCategoryId: string | undefined | null = null): CategoryNode[] | undefined {
    return arr?.filter((category) => category?.parentCategoryId === parentCategoryId)
      .map(child => (<CategoryNode> { ...child, children: this.findChildrenCategories(arr, child.id) }));
  }
}

