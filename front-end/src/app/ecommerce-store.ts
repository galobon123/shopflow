import { signalStore, withState, withMethods, withComputed, patchState, withHooks } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { ProductResponse } from './core/models/product.model';
import { CategoryResponse } from './core/models/category.model';
import { ProductService } from './core/services/product.service';
import { CategoryService } from './core/services/category.service';
import { produce } from 'immer';
import { Toaster } from './core/services/toaster';

type EcommerceState = {
  products: ProductResponse[];
  categories: CategoryResponse[];
  wishListItems: ProductResponse[];
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

  withMethods((store, productService = inject(ProductService), categoryService = inject(CategoryService), toaster = inject(Toaster)) => ({
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
  filterBy(categoryName: string | null): void {
    patchState(store, { selectedCategory: categoryName });
    },
  addToWishList : (product: ProductResponse) => { 
    const updatedWishListItem = produce(store.wishListItems(), (draft) => {
      if(draft.findIndex(p => p.id === product.id)){
        draft.push(product);
      }
    });
    patchState(store, { wishListItems: updatedWishListItem });
    toaster.success('Product added to wishlist');
  },
  removeFromWishList : (product: ProductResponse) => {
    patchState(store, { wishListItems: store.wishListItems().filter(p => p.id !== product.id) });
    toaster.success('Product removed from wishlist');
  },
  clearWishlist: () => {
    patchState(store,{ wishListItems: [] });
  }
  })),

  withHooks({
    onInit(store) {
      store.loadAll();
    },
  }),
)

