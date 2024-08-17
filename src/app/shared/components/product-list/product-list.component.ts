import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { IProduct } from '../../Interfaces/iproduct';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: IProduct[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.productList = products.products;
    });
  }

  getDiscountedPrice(product: IProduct): number {
    return product.price - (product.price * product.discountPercentage / 100);
  }
}
