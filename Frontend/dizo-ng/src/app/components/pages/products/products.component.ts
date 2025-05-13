import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/productService';
import { CategoryService } from 'src/app/services/categoryService';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: string = '';
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        // Safely sort by createdAt descending (newest first)
        this.products = [...data].sort((a, b) => {
          const dateA = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          const dateB = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          return dateA - dateB;
        });
        this.applyFilter();
      },
      error: (err) => this.errorMessage = 'Failed to load products.'
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => this.errorMessage = 'Failed to load categories.'
    });
  }

  onCategoryChange(): void {
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.selectedCategoryId) {
      this.filteredProducts = this.products.filter(
        p => p.category && p.category.id.toString() === this.selectedCategoryId
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
  
}
