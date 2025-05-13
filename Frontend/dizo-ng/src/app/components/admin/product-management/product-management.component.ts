import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/categoryService';
import { ProductService } from 'src/app/services/productService';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit {
  newProduct: Product = { id: '', name: '', description: '', price: 0, category: null };
  products: Product[] = [];
  editingProduct: Product | null = null;
  categories: Category[] = [];
  selectedCategoryId: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}
   

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      console.log('Loaded categories:', data); // Add this line
      this.categories = data;
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  onSubmit(): void {
    const selectedCategory = this.categories.find(cat => cat.id.toString() === this.selectedCategoryId);
    const productToSend: Product = {
      ...this.newProduct,
      category: selectedCategory ? { id: selectedCategory.id, name: selectedCategory.name } : null
    };

    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, productToSend).subscribe(() => {
        this.editingProduct = null;
        this.selectedCategoryId = '';
        this.newProduct = { id: '', name: '', description: '', price: 0, category: null };
        this.loadProducts();
      });
    } else {
      this.productService.createProduct(productToSend).subscribe(() => {
        this.newProduct = { id: '', name: '', description: '', price: 0, category: null };
        this.selectedCategoryId = '';
        this.loadProducts();
      });
    }
  }

  startEdit(product: Product): void {
    this.editingProduct = { ...product };
    this.newProduct = { ...product };
    this.selectedCategoryId = product.category?.id || '';
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  cancelEdit(): void {
    this.editingProduct = null;
    this.newProduct = { id: '', name: '', description: '', price: 0, category: null };
    this.selectedCategoryId = '';
  }
}
