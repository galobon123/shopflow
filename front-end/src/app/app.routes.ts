import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  // {
  //   path: 'login',
  //   loadComponent: () => import('./features/auth/login/login.component')
  //     .then(m => m.LoginComponent)
  // },
  // {
  //   path: 'register',
  //   loadComponent: () => import('./features/auth/register/register.component')
  //     .then(m => m.RegisterComponent)
  // },
  {
    path: 'products',
    loadComponent: () => import('./pages/products-grid/products-grid')
    .then(m => m.ProductsGrid)
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/my-wishlist/my-wishlist')
    .then(m => m.MyWishlist)
  },
  // {
  //   path: 'admin/products',
  //   loadComponent: () => import('./features/products/product-form/product-form.component')
  //     .then(m => m.ProductFormComponent),
  //   canActivate: [authGuard, adminGuard]
  // },
  {
    path: '**',
    redirectTo: 'products'
  }
];