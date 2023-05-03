import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, Product } from '../domain/main.domain';
import { catchError, map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getCategoryList(): Observable<Category[]> {
    const url = 'http://localhost:4200/assets/categories.json'
    return this.http.get(url).pipe(
      map((response: any) => plainToInstance(Category, response)),
      catchError((err) => throwError(err))
    );
  }

  getProductList(): Observable<Product[]> {
    const url = 'http://localhost:4200/assets/products.json'
    return this.http.get(url).pipe(
      map((response: any) => plainToInstance(Product, response)),
      catchError((err) => throwError(err))
    );
  }
}
