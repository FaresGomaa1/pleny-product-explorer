import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { IUserCredentials } from '../../shared/Interfaces/iuser'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const credentials: IUserCredentials = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        expiresInMins: 30
      };

      this.authService.login(credentials.username, credentials.password, credentials.expiresInMins).subscribe(
        response => {
          console.log('Login successful:', response);
          this.errorMessage = '';
          this.router.navigate(['/home']);
        },
        error => {
          if (error.status === 400) {
            this.errorMessage = 'Invalid credentials';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
          console.error('Login failed:', error);
        }
      );
    }
  }
}
