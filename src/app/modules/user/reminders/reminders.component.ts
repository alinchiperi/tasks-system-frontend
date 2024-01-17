import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reminder } from 'src/app/model/Reminder';
import { Task } from 'src/app/model/Task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss'],
})
export class RemindersComponent implements OnInit {
  reminderForm = new FormGroup({
    date: new FormControl(new Date(), Validators.required),
    selectTask: new FormControl(),
  });
  editFormReminder = new FormGroup({
    date: new FormControl(new Date(), Validators.required),
  });
  minDate = new Date();
  tasks: Task[] = [];
  reminders: Reminder[] = [];
  showEdit = false;
  selectedReminder: Reminder;

  constructor(private tasksService: TasksService) {}
  ngOnInit(): void {
    this.fetchTasks();
    this.fetchReminders();
    console.log(this.reminders);
  }

  fetchReminders(): void {
    let subscription = this.tasksService.getReminders().subscribe((data) => {
      this.reminders = data;
      console.log('data ' + data);
      console.log(this.reminders);
      subscription.unsubscribe;
    });
  }
  fetchTasks(): void {
    let subscription = this.tasksService.getTasksForUser().subscribe((data) => {
      this.tasks = data;
      subscription.unsubscribe;
    });
  }
  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      'T' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  showEditForm(reminder) {
    this.showEdit = true;
    this.selectedReminder = reminder;
  }
  editReminder() {
    const date = this.reminderForm.value.date;
    const reminderDateTime = this.formatDate(date);
    let edit = {
      id: this.selectedReminder.id,
      reminderDateTime: reminderDateTime,
    };
    let subscription = this.tasksService.editReminder(edit).subscribe({
      next: () => {
        subscription.unsubscribe();
        this.fetchReminders();
        this.showEdit = false;
      },
      error: () => {
        console.log('error');
      },
    });
  }
  deleteReminder(reminder) {
    let subscription = this.tasksService
      .deleteReminders(reminder.id)
      .subscribe({
        next: () => {
          subscription.unsubscribe();
          this.fetchReminders();
        },
      });
  }
  submit() {
    if (this.reminderForm.valid) {
      const title = this.reminderForm.controls.selectTask.value || ' ';
      const selectedTask = this.tasks.find((task) => task.title === title);
      const date = this.reminderForm.value.date;
      const reminderDateTime = this.formatDate(date);
      let reminder = {
        taskId: selectedTask.id,
        reminderDateTime: reminderDateTime,
      };
      let subscription = this.tasksService.addReminder(reminder).subscribe({
        next: () => {
          subscription.unsubscribe();
          this.fetchReminders();
        },
        error: (error) => {
          console.error('Error adding task:', error);
        },
      });
    }
  }
}
