import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { matchValidator } from './custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      matchValidator('confirm', true),
    ]),
    confirm: new FormControl('', [
      Validators.required,
      matchValidator('password'),
    ]),
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
    if (this.registerForm.valid) {
      const email = this.registerForm.controls.email.value || '';
      const password = this.registerForm.controls.password.value || '';

      this.authService.registerUser(email, password).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User Created',
          });
          setTimeout(() => this.router.navigate(['/login']), 4000);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error creating user',
          });
        },
      });
    }
  }
}
