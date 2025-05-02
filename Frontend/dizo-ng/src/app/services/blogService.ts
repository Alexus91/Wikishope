import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:8080/api/blogs'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  getBlogs(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paginated?page=${page}&size=${size}`);
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }
  createBlog(blog: Blog): Observable<Blog> {

    const headers = this.getAuthHeaders();
    return this.http.post<Blog>(this.apiUrl, blog, { headers });
  }
  private getAuthHeaders(): { [header: string]: string } {
    const token = this.getCookie('authToken');
    return { 'Authorization': `Bearer ${token}` };
  }

  private getCookie(name: string): string { // Get cookie by name 
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

  updateBlog(id: number, blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/${id}`, blog,{ withCredentials: true });
  }

  deleteBlog(id: string): Observable<void> {
    const headers = this.getAuthHeaders();


    return this.http.delete<void>(`${this.apiUrl}/${id}`,{headers});
  }
  /**
    const token = this.getCookie('authToken');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    return this.http.post(`${this.apiUrl}/upload`, formData, { headers });
   */
    uploadImage(formData: FormData): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.post(`${this.apiUrl}/uploads`, formData, { headers });
    }
}