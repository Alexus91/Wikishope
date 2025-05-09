import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

    private getAuthHeaders(): { [header: string]: string } {
        const token = this.getCookie('authToken'); // or get from localStorage/sessionStorage
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }

    private getCookie(name: string): string {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (const c of ca) {
        let cookie = c.trim();
        if (cookie.startsWith(nameEQ)) {
            return cookie.substring(nameEQ.length);
        }
        }
        return "";
    }

    getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }
  
    createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category, { headers: this.getAuthHeaders() });
  }
    updateCategory(id: string, category: Category): Observable<Category> {
        return this.http.put<Category>(`${this.apiUrl}/${id}`, category, { headers: this.getAuthHeaders() });
    }
    deleteCategory(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
    }
    
}