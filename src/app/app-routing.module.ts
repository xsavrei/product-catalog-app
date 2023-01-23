import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components';

const routes: Routes = [
  {
    path: 'main-page',
    component: MainPageComponent
  }, {
    path: '',
    redirectTo: '/main-page',
    pathMatch: 'full'
  }, {
    path: '**',
    redirectTo: '/main-page'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
