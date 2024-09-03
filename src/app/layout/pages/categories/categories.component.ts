import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/categories/category.service';
import {
  category,
  categoryResponse,
} from '../../../shared/interfaces/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  subCategoriesData: category[] | null = null;
  mainCategory!: string;
  categoriesData: categoryResponse | null = null;
  isLoading: boolean = true;
  constructor(private _CategoryService: CategoryService) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/categories');
    }
    this.getCategories();
  }

  getCategories(): void {
    this._CategoryService.getAllCategories().subscribe((res) => {
      this.categoriesData = res;
      this.isLoading = false;
    });
  }

  getSubcategoriesOnCategory(productId: string, mainCategory: string): void {
    this.mainCategory = mainCategory;
    this._CategoryService
      .getSubcategoriesOnCategory(productId)
      .subscribe((res) => {
        this.subCategoriesData = res.data;
      });
  }
}
