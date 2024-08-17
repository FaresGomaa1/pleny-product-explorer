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
  paginatedProducts: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;
  pages: number[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(response => {
      this.productList = response.products;
      this.filteredProducts = this.productList;
      this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updatePaginatedProducts();
    });
  }

  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }

  handleSearch(searchTerm: string): void {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    if (normalizedSearchTerm === '') {
      this.filteredProducts = [...this.productList];
    } else {
      this.filteredProducts = this.productList.filter(product =>
        this.containsSearchTerm(product, normalizedSearchTerm)
      );
    }
    this.updatePaginatedProducts();
  }

  private containsSearchTerm(product: IProduct, searchTerm: string): boolean {
    return product.title.toLowerCase().includes(searchTerm)
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }
  applyFilters(): void {
    let products = [...this.productList];

    // Filter by category if selected
    if (this.selectedCategory) {
      products = products.filter(product => product.category === this.selectedCategory);
    }

    // Update filtered products and pagination
    this.filteredProducts = products;
    this.updatePaginatedProducts();
  }

  getDiscountedPrice(product: IProduct): number {
    return product.price - (product.price * product.discountPercentage / 100);
  }
}
