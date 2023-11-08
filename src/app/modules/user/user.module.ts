import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MainUserComponent } from './main-user/main-user.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipsModule } from 'primeng/chips';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [MainUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TagModule,
    CardModule,
    InputTextareaModule,
    ChipsModule,
    CalendarModule,
    ReactiveFormsModule,
    DialogModule,
  ],
})
export class UserModule {}
