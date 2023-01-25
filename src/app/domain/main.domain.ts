export enum SortingOption {
  NAME = 'NAME',
  PRICE = 'PRICE'
}

export class Category {
  id?: string;
  name?: string;
  parentCategoryId?: string;

  constructor(copy: Category) {
    Object.assign(this, copy);
  }
}

export class Product {
  id?: string
  name?: string;
  description?: string;
  categoryId?: string;
  image?: string;
  price?: number;

  constructor(copy: Product) {
    Object.assign(this, copy);
  }
}
