import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-header-actions',
  imports: [MatBadge, MatButton, MatIconButton, MatIcon, RouterLink],
  templateUrl: './header-actions.html',
  styleUrl: './header-actions.css',
})
export class HeaderActions {

  store = inject(EcommerceStore);

}
