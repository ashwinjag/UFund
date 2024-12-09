import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | undefined;

  private jsonUrl = 'assets/users.json';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.jsonUrl);
  }

  validateLogin(username: string, password: string, users: User[]): boolean {
    this.user = users.find(user => user.username === username && user.password === password) || undefined;
    return users.some(user => user.username === username && user.password === password);
  }

  getLoginData(): { user: User | undefined } {
    return { user: this.user };
  }

  clearLoginData(): void {
    this.user = undefined;
  }

  getUsername(): string | undefined {
    return this.user?.username;
  }
}