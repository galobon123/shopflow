import { Component, computed, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductResponse } from '../../core/models/product.model';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.css',
})
export class ToggleWishlistButton {

  product = input.required<ProductResponse>();

  store = inject(EcommerceStore);

    isInWishlist = computed(() => 
      this.store.wishListItems().some(item => item.productId === this.product().id)
    );

    toggleWishlist() {
      const product = this.product();
      if (this.isInWishlist()) {
        this.store.removeFromWishList(product.id);
      } else {
        this.store.addToWishList(product);
      }
    }
}
