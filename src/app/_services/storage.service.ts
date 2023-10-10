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
    var user = window.sessionStorage.getItem(USER_KEY);
	const tokenUser = this.parseToken();
	
    if (user) {
      return user = {...JSON.parse(user), ...tokenUser};
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

  private parseToken(): any {
	try {
		var itoken = JSON.parse(atob(this.getToken().split(".")[1]));
		return itoken;
	} catch (e) {
		return null;
	}
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
  
}
