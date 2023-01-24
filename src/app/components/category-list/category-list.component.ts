import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Category } from '../../domain/main.domain';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

interface CategoryNode {
  id: string;
  name: string;
  parentCategoryId?: string;
  children?: CategoryNode[];
}

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: string;
  parentCategoryId?: string;
}

@UntilDestroy()
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnChanges {

  @Input()
  categories?: Category[];
  @Input()
  currentCategoryId?: string;

  treeData?: CategoryNode[] | undefined;

  private _transformer = (node: CategoryNode, level: number) => {
    return <FlatNode> {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id: node.id,
      parentCategoryId: node.parentCategoryId
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

  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories']?.currentValue) {
      this.treeData = this.mapToCategoriesNodes(this.categories);
      this.treeData?.push(<CategoryNode> { id: '', name: 'All Categories' });
      this.treeData?.sort((a, b) => a.name.localeCompare(b.name))
      this.dataSource.data = this.treeData ?? [];
    }
    if (this.currentCategoryId && this.treeControl.dataNodes) {
      this.expandFlatNodes(this.currentCategoryId);
    }
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  mapToCategoriesNodes(arr: Category[] | undefined, parentCategoryId: string | undefined | null = null): CategoryNode[] | undefined {
    return arr?.filter((category) => category?.parentCategoryId === parentCategoryId)
      .map(child => (<CategoryNode> {
        ...child,
        children: this.mapToCategoriesNodes(arr, child.id)
      }));
  }

  expandFlatNodes(id: string) {
    const currentFlatNode = this.treeControl.dataNodes.find(node => node.id === id);
    if (currentFlatNode) {
      this.treeControl.expand(currentFlatNode);
    }
    if (currentFlatNode?.parentCategoryId) {
      this.expandFlatNodes(currentFlatNode.parentCategoryId);
    }
  }

  getActiveCategory(id: string): boolean {
    return id === this.currentCategoryId ? id === this.currentCategoryId : !this.currentCategoryId && !id;
  }


  onClick(id: string) {
    this.router.navigate([id]);
  }
}

