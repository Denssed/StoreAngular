import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { PresentationModalComponent } from '../../components/presentation-modal/presentation-modal.component';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule, PresentationModalComponent]
})
export class LoginComponent {
  loginForm: FormGroup;

  isLoginSuccess: boolean = false;
  isLoginFail: boolean = false;
  isServerError: boolean = false;

  constructor(private readonly appComponent: AppComponent, private fb: FormBuilder, private authService: AuthService, private readonly router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.appComponent.onModal = false;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.authUser(email, password).subscribe({
        next: response => {
          const authorizationHeader = response.headers.get('Authorization');
          if (authorizationHeader) {
            sessionStorage.setItem('authToken', authorizationHeader);
            this.openOnLoginSuccessModal();
            this.router.navigate(['/dashboard/home']);
          } else {
            this.openOnLoginFailModal();
          }
        },
        error: err => {
          if (err.status === 401) {
            this.openOnLoginFailModal();
          } else {
            this.openOnServerErrorModal();
          }
          console.error("Login error:", err);
        }
      });
    }
  }

  openOnLoginSuccessModal() {
    this.isLoginSuccess = true;
    this.appComponent.onModal = true;
    document.body.classList.add('overflow-hidden');
  }

  closeOnLoginSuccessModal() {
    this.isLoginSuccess = false;
    document.body.classList.remove('overflow-hidden');
  }

  openOnLoginFailModal() {
    this.isLoginFail = true;
    this.appComponent.onModal = true;
    document.body.classList.add('overflow-hidden');
  }

  closeOnLoginFailModal() {
    this.isLoginFail = false;
    document.body.classList.remove('overflow-hidden');
  }

  openOnServerErrorModal() {
    this.isServerError = true;
    this.appComponent.onModal = true;
    document.body.classList.add('overflow-hidden');
  }

  closeOnServerErrorModal() {
    this.isServerError = false;
    document.body.classList.remove('overflow-hidden');
  }
}
