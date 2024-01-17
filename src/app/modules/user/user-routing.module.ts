import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainUserComponent } from './main-user/main-user.component';
import { RemindersComponent } from './reminders/reminders.component';

const routes: Routes = [
  {
    path: '',
    component: MainUserComponent,
  },
  {
    path: 'reminders',
    component: RemindersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
