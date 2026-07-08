import { Component, inject, Input, input } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { MatNavList, MatListItem } from "@angular/material/list";
import { EcommerceStore } from '../../ecommerce-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenav, MatSidenavContainer, MatSidenavContent, MatNavList, MatListItem],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.css',
})
export class ProductsGrid{
  readonly store = inject(EcommerceStore);
  private readonly router = inject(Router);

  @Input() set categoryName(value: string | null) {
    const category = value === 'all' ? null : value;
    this.store.filterBy(category);
  }

  filterBy(categoryName: string | null): void {
    this.router.navigate(['/products', categoryName || 'all']);
  }

  addToCart(){
    console.log('Add to cart clicked');
  }
}
