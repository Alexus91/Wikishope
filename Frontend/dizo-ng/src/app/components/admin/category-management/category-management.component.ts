import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/categoryService';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {
  newCategoryName = '';
  categories: Category[] = [];
  editingCategory: Category | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => this.categories = data);
  }

  addCategory(): void {
    if (!this.newCategoryName.trim()) return;
    this.categoryService.createCategory({ name: this.newCategoryName }).subscribe(() => {
      this.newCategoryName = '';
      this.loadCategories();
    });
  }

  deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id).subscribe(() => this.loadCategories());
  }

  startEdit(cat: Category): void {
    this.editingCategory = { ...cat };
  }

  updateCategory(): void {
    if (this.editingCategory) {
      this.categoryService.updateCategory(this.editingCategory.id!, this.editingCategory).subscribe(() => {
        this.editingCategory = null;
        this.loadCategories();
      });
    }
  }

  cancelEdit(): void {
    this.editingCategory = null;
  }
}