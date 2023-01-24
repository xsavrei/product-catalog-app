import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  CategoryListComponent,
  HeaderBarComponent,
  MainPageComponent,
  ProductComponent,
  ProductsDetailPageComponent,
  ProductsEditFormComponent,
  ProductsListComponent
} from './components';
import { HttpClientModule } from '@angular/common/http';
import { metaReducers, ProductCatalogEffects, productCatalogFeatureKey, reducer, reducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    MainPageComponent,
    CategoryListComponent,
    ProductsListComponent,
    ProductsEditFormComponent,
    ProductsDetailPageComponent,
    ProductComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature(
      productCatalogFeatureKey,
      reducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([ProductCatalogEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    NgbModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
