import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WishListResponse } from '../models/wishlist.model';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  private url = `${environment.apiUrl}/wishlist`;

  constructor(private http: HttpClient) {}

  getWishlist(): Observable<WishListResponse[]> {
    return this.http.get<WishListResponse[]>(this.url);
  }

  add(productId: number): Observable<void> {
    return this.http.post<void>(`${this.url}/${productId}`, null);
  }

  remove(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${productId}`);
  }

  check(productId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/check/${productId}`);
  }
}