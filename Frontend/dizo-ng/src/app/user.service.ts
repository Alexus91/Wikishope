import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  // POST: Signup (Register)
  signup(fullName: string , email: string, password: string): Observable<any> {
    const body = { email,fullName, password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}/signup`, body, { headers });
  }

  // POST: Login
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}/login`, body, { headers });
  }
}





