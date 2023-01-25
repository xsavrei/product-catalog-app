import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Product } from '../../domain/main.domain';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products-edit-form',
  templateUrl: './products-edit-form.component.html',
  styleUrls: ['./products-edit-form.component.scss']
})
export class ProductsEditFormComponent {

  value?: Product;

  @Input()
  set product(product: Product) {
    if (product) {
      this.value = product
      this.form.controls.name.setValue(product.name);
      this.form.controls.description.setValue(product.description);
      this.form.controls.price.setValue(product.price);
    }
  }

  @Output()
  editedProduct = new EventEmitter<Product>();

  form = this.formBuilder.group({
    name: this.formBuilder.control<string | undefined>(undefined, Validators.required),
    description: this.formBuilder.control<string | undefined>(undefined, Validators.required),
    price: this.formBuilder.control<number | undefined>(undefined, Validators.required)
  })

  constructor(private formBuilder: NonNullableFormBuilder,
              public ngbActiveModal: NgbActiveModal) {
  }

  createValueFromForm(): Product | undefined {
    return {
      ...this.value,
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price
    }
  }

  submit(): void {
    if (this.form.valid) {
      const formValue = this.createValueFromForm();
      if (formValue) {
        this.editedProduct.emit(formValue)
        this.ngbActiveModal.close(formValue)
      }
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched()
      })
    }
  }

}
