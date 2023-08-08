import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    CommonModule, 
    HttpClientModule
  ],
  exports: [
    TaskListComponent
  ]
})
export class TaskListModule { }
