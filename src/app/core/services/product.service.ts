import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IProduct, IProductSearchResult } from '../../shared/Interfaces/iproduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = environment.apiUrl + '/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<IProductSearchResult> {
    return this.http.get<IProductSearchResult>(this.apiUrl);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  searchProducts(query: string): Observable<IProductSearchResult> {
    const params = new HttpParams().set('q', query);
    return this.http.get<IProductSearchResult>(`${this.apiUrl}/search`, { params });
  }

  sortProducts(sortBy: string, order: 'asc' | 'desc' = 'asc'): Observable<IProductSearchResult> {
    const params = new HttpParams().set('sortBy', sortBy).set('order', order);
    return this.http.get<IProductSearchResult>(this.apiUrl, { params });
  }
}
