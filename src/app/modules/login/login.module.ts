import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { RegisterComponent } from './register/register.component';
import { StyleClassModule } from 'primeng/styleclass';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    PanelModule,
    InputTextModule,
    StyleClassModule,
    ToastModule,
    CheckboxModule,
  ],
})
export class LoginModule {}
