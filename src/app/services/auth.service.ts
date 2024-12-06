import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.interface';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private base_url = 'https://granlighting.co.in/api/';  // Replace with your actual API base URL
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Login method - sends data to the backend API
  login(data: FormData) {
    return this.http.post<any>(`${this.base_url}Login`, data).pipe(
      catchError((error) => {
        // Handle error (optional)
        throw new Error('Login failed');
      })
    );
  }

  // Get User Profile after login
  getUserProfile(token: string) {
    return this.http.get<User>(`${this.base_url}UserProfile`, {
      headers: { Authorization: `Bearer ${token}` },
    }).pipe(
      catchError((error) => {
        // Handle error (optional)
        throw new Error('Failed to fetch user profile');
      })
    );
  }

  // Set user data in the service after successful login
  setUserData(user: User) {
    this.currentUserSubject.next(user);
  }

  // Get user data from the service
  getUserData(): User | null {
    return this.currentUserSubject.value;
  }

  // Logout the user
  logout() {
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
