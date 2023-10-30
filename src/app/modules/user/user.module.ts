import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MainUserComponent } from './main-user/main-user.component';
import { TableModule } from 'primeng/table';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [MainUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TagModule,
  ],
})
export class UserModule {}
