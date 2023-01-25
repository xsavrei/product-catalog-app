import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent, ProductsDetailPageComponent, ProductsEditFormComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'edit',
    component: ProductsEditFormComponent
  },{
    path: ':categoryId',
    component: MainPageComponent
  },
  {
    path: ':categoryId/product/:id',
    component: ProductsDetailPageComponent
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
