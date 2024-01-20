import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { min } from 'rxjs';
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
  selectedTask: Task = {
    title: '',
    id: 0,
    description: '',
    dueDate: new Date(),
    taskStatus: 'PENDING',
    userId: 0,
    tags: [],
  };
  taskFormEdit = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(),
    date: new FormControl(new Date(), Validators.required),
    status: new FormControl(),
    tags: new FormControl(),
  });
  statusList: string[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED'];
  minDate: Date | undefined;

  tagNames: string[];
  constructor(
    private tasksService: TasksService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}
  showTask: boolean = false;
  editDialogVisible = false;

  ngOnInit(): void {
    this.minDate = new Date();
    this.fetchTasks();
  }
  fetchTasks(): void {
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

      let subscription = this.tasksService.addTask(task).subscribe({
        next: () => {
          subscription.unsubscribe();
          this.showTask = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Task added',
          });
          this.fetchTasks();
        },
        error: (error) => {
          console.error('Error adding task:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error adding  item',
          });
          this.showTask = false;
        },
      });
    }
  }
  cancel() {
    this.showTask = false;
  }
  deleteTask(taskId: number): void {
    this.tasksService.deleteTask(taskId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Task deleted',
        });
        this.fetchTasks();
      },
      error: (error) => {
        console.error('Error deleting item:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error deleting item',
        });
      },
    });
  }
  completeTask(taskId: number): void {
    this.tasksService.completeTask(taskId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Task Completed',
        });
        this.fetchTasks();
      },
      error: (error) => {
        console.error('Error completed task:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error completed task',
        });
      },
    });
  }
  showEditDialog(task: Task): void {
    this.selectedTask = { ...task };
    this.tagNames = this.selectedTask.tags.map((tag) => tag.name);
    this.editDialogVisible = true;
    this.tagNames = this.selectedTask.tags.map((tag) => tag.name);
    this.taskFormEdit.patchValue({
      title: this.selectedTask.title,
      description: this.selectedTask.description,
      date: task.dueDate,
      tags: this.tagNames,
      status: this.selectedTask.taskStatus,
    });
  }
  onEdit() {
    const title = this.taskFormEdit.controls.title.value;
    const description = this.taskFormEdit.controls.description.value;
    const date = this.taskFormEdit.controls.date.value;
    const dueDate = this.formatDate(date);
    const tagsArray = this.taskFormEdit.controls.tags.value;
    const status = this.taskFormEdit.controls.status.value;

    let tags = [];
    if (tagsArray !== null) {
      tags = tagsArray.map((item) => ({ name: item }));
    }
    let id = this.selectedTask.id;
    let task = {
      id: id,
      title: title,
      description: description,
      taskStatus: status,
      dueDate: dueDate,
      userId: 1,
      tags: tags,
    };

    console.log(status);

    let subscription = this.tasksService.editTask(id, task).subscribe({
      next: () => {
        subscription.unsubscribe();
        this.editDialogVisible = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Task edited',
        });
        this.fetchTasks();
      },
      error: (error) => {
        console.error('Error adding task:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error editing  task',
        });
        this.showTask = false;
      },
    });
  }
  goToReminders() {
    this.router.navigate(['/user/reminders']);
  }

  buyPremium() {
    let subscription = this.authService.buyPremium().subscribe({
      next: () => {
        subscription.unsubscribe();
        this.editDialogVisible = false;
        this.messageService.add({
          severity: 'success',
          summary: 'premium',
          detail: 'Premium ',
        });
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Error :', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error',
        });
        this.showTask = false;
      },
    });
  }
}
