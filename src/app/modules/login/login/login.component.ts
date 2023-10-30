import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}
  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.controls.email.value || '';
      const password = this.loginForm.controls.password.value || '';

      this.authService.login(email, password).subscribe((_data) => {
        this.router.navigate(['/user']);
      });
    }
  }
}
