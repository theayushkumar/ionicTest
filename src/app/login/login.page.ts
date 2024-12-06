import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const formdata = new FormData()
    formdata.append('EmailId', this.loginForm.get('username')?.value.trim().replace(/\s+/g, '')),
    formdata.append('Password', this.loginForm.get('password')?.value.trim().replace(/\s+/g, '')),
      this.authService.login(formdata).subscribe(
        (response: any) => {
          // Assuming your login API response contains a token
          const token = response.Id;

          if (token) {
            // Store the token in the AuthService
            localStorage.setItem('token', token);

            // Now get the user profile using the token
            this.authService.getUserProfile(token).subscribe(
              (user: User) => {
                // Set user data in the AuthService
                this.authService.setUserData(user);

                // Redirect to the dashboard page
                this.router.navigate(['/home/dashboard']);
              },
              (err) => {
                this.loginError = 'Failed to load user profile';
              }
            );
          }
        },
        (err) => {
          this.loginError = 'Invalid credentials';
        }
      );
  }
}
