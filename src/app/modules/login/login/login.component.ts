import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const email = this.loginForm.controls.email.value || '';
      const password = this.loginForm.controls.password.value || '';

      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/user']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error login user',
          });
        },
      });
    }
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
