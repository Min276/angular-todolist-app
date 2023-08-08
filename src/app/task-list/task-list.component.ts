import {
  Component,
  ViewChild,
  ViewChildren,
  OnInit,
  ElementRef,
  QueryList,
} from '@angular/core';
import { TodolistsService } from '../todolists.service';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  constructor(private todolistService: TodolistsService) {}

  tasks: any;
  isEdit: boolean = false;
  selectedItemId: any;
  editTask: any;

  fetchData() {
    this.todolistService.getAllData()?.subscribe((data: any) => {
      this.tasks = data;
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  @ViewChild('newTask') inputName: any;

  add(newTask: string) {
    if (newTask.trim().length > 0) {
      let body = {
        task: newTask,
        isDone: false,
      };

      this.todolistService.postData(body).subscribe((response) => {
        console.log(response);
        this.inputName.nativeElement.value = '';
        this.fetchData();
      });
    }
  }

  //  @ViewChildren('ps')
  // ps!: QueryList<ElementRef>;

  updateTask(existingTask: any, editTask: any) {
    if (existingTask.id) {
      this.selectedItemId = existingTask.id;
      this.isEdit = !this.isEdit;

      // this.ps.toArray()[i].nativeElement.focus();

      let id = existingTask.id;
      let body = {
        task: editTask.trim(),
      };

      if (editTask.trim() !== existingTask.task.trim()) {
        this.todolistService.updateData(body, id).subscribe((response) => {
          console.log(response);
          this.fetchData();
        });
      }
    }
  }

  updateStatus(existingTask: any) {
    let id = existingTask.id;
    let body = {
      isDone: !existingTask.isDone,
    };
    this.todolistService.updateData(body, id).subscribe((response) => {
      console.log(response);
      this.fetchData();
    });
  }

  remove(existingTaskId: number) {
    this.todolistService.deleteData(existingTaskId).subscribe((response) => {
      console.log(response);
      this.fetchData();
    });
  }
}
