import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Product } from './Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';

  private selectedProductSource = new BehaviorSubject<Product | null>(null);
  selectedProductChanges$ = this.selectedProductSource.asObservable();

  constructor(private http: HttpClient) { }

  changeSelectedProduct(selectedProduct: Product | null): void {
    this.selectedProductSource.next(selectedProduct);
  }

  getProducts(): Observable<Product[]> {
   
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        // tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

 /*  // Return an initialized product
  newProduct(): Product {
    return {
        id: 0,
        category: '',
        title: '',
        subtitle: '',
        imageSrc:'',
        price: 0,
    };
  } */

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Product Id must be null for the Web API to assign an Id
    const newProduct = { ...product, id: null };
    return this.http.post<Product>(this.productsUrl, newProduct, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<Product>(url, product, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + product.id)),
        map(() => product),
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {

      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
