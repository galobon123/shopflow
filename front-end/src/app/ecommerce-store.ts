import { signalStore, withState, withMethods, withComputed, patchState, withHooks } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { ProductResponse } from './core/models/product.model';
import { CategoryResponse } from './core/models/category.model';
import { ProductService } from './core/services/product.service';
import { CategoryService } from './core/services/category.service';

type EcommerceState = {
  products: ProductResponse[];
  categories: CategoryResponse[];
  selectedCategory: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: EcommerceState = {
  products: [],
  categories: [],
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
  })})),

  withMethods((store, productService = inject(ProductService), categoryService = inject(CategoryService)) => ({
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
  })),

  withHooks({
    onInit(store) {
      store.loadAll();
    },
  }),
)

