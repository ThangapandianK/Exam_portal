import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private authTokenKey: string = 'authToken'; 

  constructor(private router:Router) { }

  public login(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    this.isAuthenticated = true;
  }

  public logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this.isAuthenticated = false;
    this.router.navigate(['/login'])

  }

  public checkAuthenticated(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }
}