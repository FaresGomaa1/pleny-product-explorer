import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { ICategory } from '../../Interfaces/icategory';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: ICategory[] = [];
  selectedCategory: string = '';

  @Output() categoryChange = new EventEmitter<string>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCategoryChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedCategory = input.value;
    this.categoryChange.emit(this.selectedCategory);
  }
}
