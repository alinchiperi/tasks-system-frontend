import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Task } from 'src/app/model/Task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.scss'],
})
export class MainUserComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private tasksService: TasksService) {}
  showTask: boolean;

  ngOnInit(): void {
    let subscription = this.tasksService.getTasksForUser().subscribe((data) => {
      this.tasks = data;
      subscription.unsubscribe;
    });
  }
  clear(table: Table) {
    table.clear();
  }
  addTask() {}
}
