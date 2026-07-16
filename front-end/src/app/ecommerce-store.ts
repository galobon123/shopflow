import { signalStore, withState, withMethods, withComputed, patchState, withHooks } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { ProductResponse } from './core/models/product.model';
import { CategoryResponse } from './core/models/category.model';
import { ProductService } from './core/services/product.service';
import { CategoryService } from './core/services/category.service';
import { WishListService } from './core/services/wishlist.service';
import { AuthService } from './core/services/auth.service';
import { WishListResponse } from './core/models/wishlist.model';
import { produce } from 'immer';
import { Toaster } from './core/services/toaster.service';

type EcommerceState = {
  products: ProductResponse[];
  categories: CategoryResponse[];
  wishListItems: WishListResponse[];
  selectedCategory: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: EcommerceState = {
  products: [],
  categories: [],
  wishListItems: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

export const EcommerceStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
  filteredProducts: computed(() => {
    const category = store.selectedCategory();
    if (!category) return store.products();
    return store.products().filter((p) => p.categoryName === category);
  }),
  wishListCount: computed(() => store.wishListItems().length),
})),

  withMethods((store,
    productService = inject(ProductService), 
    categoryService = inject(CategoryService), 
    wishListService = inject(WishListService),
    authService = inject(AuthService),
    toaster = inject(Toaster)) => ({
  loadAll(): void {
    patchState(store, { loading: true, error: null });
    productService.getAll().subscribe({
      next: (products) => patchState(store, { products, loading: false }),
      error: () => patchState(store, { error: 'Error loading products', loading: false }),
    });

    categoryService.getAll().subscribe({
      next: (categories) => patchState(store, { categories }),
    });
  },
  loadWishlist(): void {
  if (!authService.isLoggedIn()) return;
    wishListService.getWishlist().subscribe({
      next: (items) => patchState(store, { wishListItems: items }),
      error: () => { /* silencioso, no bloquea la app */ },
    });
  },
  filterBy(categoryName: string | null): void {
    patchState(store, { selectedCategory: categoryName });
  },
  addToWishList : (product: ProductResponse) => { 
    if (!authService.isLoggedIn()) {
    toaster.info('Iniciá sesión para usar la wishlist');
    return;
  }
  wishListService.add(product.id).subscribe({
      next: () => {
        const item: WishListResponse = {
          id: 0,
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
          productImageUrl: product.imageUrl ?? '',
          productStock: product.stock,
          createdAt: new Date().toISOString(),
        };
        patchState(store, { wishListItems: [...store.wishListItems(), item] });
        toaster.success('Product added to wishlist');
      },
      error: () => toaster.error('Error adding to wishlist'),
    });
  },
  removeFromWishList : (productId: number) => {
      wishListService.remove(productId).subscribe({
      next: () => {
        patchState(store, { 
          wishListItems: store.wishListItems().filter(p => p.productId !== productId) 
        });
        toaster.success('Product removed from wishlist');
      },
      error: () => toaster.error('Error removing from wishlist'),
    });
  },
  clearWishlist: () => {
      store.wishListItems().forEach(item => {
      wishListService.remove(item.productId).subscribe();
    });
    patchState(store, { wishListItems: [] });
  },
  })),

  withHooks({
    onInit(store) {
      store.loadAll();
      store.loadWishlist();
    },
  }),
)

