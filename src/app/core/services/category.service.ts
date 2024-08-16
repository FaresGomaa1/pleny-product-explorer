import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { ICategory } from '../../shared/Interfaces/icategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl: string;

  constructor(private http: HttpClient, private productService: ProductService) {
    this.apiUrl = this.productService.apiUrl + '/categories';
  }

  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.apiUrl);
  }
}
