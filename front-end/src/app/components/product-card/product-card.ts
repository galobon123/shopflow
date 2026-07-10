import { Component, input, output, computed} from '@angular/core';
import { ProductResponse } from '../../core/models/product.model';
import { DecimalPipe } from '@angular/common';
import { MatAnchor } from "@angular/material/button";
import { MatIcon, } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe, MatAnchor, MatButton, MatIcon],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<ProductResponse>();

  stockInfo = computed(() => {
    const stock = this.product().stock;
    if (stock === 0)           return { label: 'Out of Stock', color: 'text-red-500 border-red-500 font-semibold' };
    if (stock >= 10)           return { label: '10+ U.',       color: 'text-green-600 border-green-600 font-semibold' };
    return { label: `${stock} u.`, color: 'text-yellow-500 border-yellow-500 font-semibold' };
  });

  addToCartClicked = output<ProductResponse>();
}

