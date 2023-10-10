import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const AUTH_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(AUTH_KEY);
    window.sessionStorage.setItem(AUTH_KEY, token);
  }

  public getToken(): string {
    const token = window.sessionStorage.getItem(AUTH_KEY);
    if (token) {
      return token;
    }

    return "";
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
  
}
