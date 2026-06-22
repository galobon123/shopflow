import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategoryRequest, CategoryResponse } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(this.url);
  }

  create(category: CategoryRequest): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.url, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}