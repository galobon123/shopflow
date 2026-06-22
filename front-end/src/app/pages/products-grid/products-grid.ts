import { Component, signal, OnInit, computed } from '@angular/core';
import { ProductResponse } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { CategoryResponse } from '../../core/models/category.model';
import { CategoryService } from '../../core/services/category.service';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { MatNavList, MatListItem } from "@angular/material/list";

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenav, MatSidenavContainer, MatSidenavContent, MatNavList, MatListItem],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.css',
})
export class ProductsGrid implements OnInit {

  
  allProducts = signal<ProductResponse[]>([]);
  categories = signal<CategoryResponse[]>([]);
  selectedCategory = signal<string | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  products = computed(() => {
    const category = this.selectedCategory();
    const all = this.allProducts();
    if (!category) return all;
    return all.filter(p => p.categoryName === category);
  });
  
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: data => {
        console.log('Products loaded:', data);
        this.allProducts.set(data);
        this.loading.set(false);
      },
      error: err => {
        this.error.set('Failed to load products. Please try again later.');
        this.loading.set(false);
        console.error(err);
      }
    });

    this.categoryService.getAll().subscribe({
        next: data => this.categories.set(data)
      });
  }

  filterBy(categoryName: string | null): void {
    this.selectedCategory.set(categoryName);
  }

  addToCart(){
    console.log('Add to cart clicked');
  }
}
