import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Task } from 'src/app/model/Task';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.scss'],
})
export class MainUserComponent implements OnInit {
  tasks: Task[] = [];
  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(),
    date: new FormControl(new Date(), Validators.required),
    tags: new FormControl(),
  });
  minDate: Date | undefined;
  constructor(
    private tasksService: TasksService,
    private authService: AuthService
  ) {}
  showTask: boolean = false;

  ngOnInit(): void {
    this.minDate = new Date();
    let subscription = this.tasksService.getTasksForUser().subscribe((data) => {
      this.tasks = data;
      subscription.unsubscribe;
    });
  }
  clear(table: Table) {
    table.clear();
  }
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
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
  showTaskForm() {
    this.showTask = true;
  }
  addTask() {
    if (this.taskForm.valid) {
      const title = this.taskForm.controls.title.value;
      const description = this.taskForm.controls.description.value;
      const date = this.taskForm.controls.date.value;
      const dueDate = this.formatDate(date);
      const tagsArray = this.taskForm.controls.tags.value;
      let tags = [];
      if (tagsArray !== null) {
        tags = tagsArray.map((item) => ({ name: item }));
      }
      let task = {
        title: title,
        description: description,
        dueDate: dueDate,
        tags: tags,
        userId: this.authService.getUserId(),
      };

      let subscription = this.tasksService.addTask(task).subscribe(() => {
        subscription.unsubscribe();
      });
      this.showTask = false;

      window.location.reload();
    }
  }
  cancel() {
    this.showTask = false;
  }
}
