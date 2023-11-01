import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { Tag } from 'src/app/model/Tag';
import { Task } from 'src/app/model/Task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.scss'],
})
export class MainUserComponent implements OnInit {
  tasks: Task[] = [];
  tags: Array<Tag> = new Array();
  taskForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    date: new FormControl(),
    tags: new FormControl(),
  });
  minDate: Date | undefined;
  constructor(private tasksService: TasksService) {}
  showTask: boolean;

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
  addTask() {
    const title = this.taskForm.controls.title.value;
    const description = this.taskForm.controls.description.value;
    const date = this.taskForm.controls.date.value;
    const tagsControl = this.taskForm.controls.tags.value;

    tagsControl.forEach((element) => {
      this.tags.push(new Tag(element));
    });
    // console.log('title is ' + title);
    // console.log('description is ' + description);
    // console.log('tags is ' + tags.length);
    // console.log('date is ' + this.formatDate(date));
    console.log(this.tags);
  }
}
