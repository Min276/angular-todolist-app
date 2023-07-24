import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
    title = 'To Do List';
    tasks: Task[] = [
      new Task("Visit Ann"),
      new Task("Call Dad"),
      new Task("Go to the gym"),
      new Task("Wash the dishes"),
      new Task("Shop for the party")
    ]
  
    @ViewChild('newTask') inputName: any; // accessing the reference element
  
  
    add(newTask: string) {
      if (newTask.trim().length > 0) {
        this.tasks.push(new Task(newTask))
        this.inputName.nativeElement.value = ""
      }
    }
  
    remove(existingTask: Task) {
      let userConfirmed = confirm(`Are you sure you want to remove "${existingTask.title}" ?`)
  
      if (userConfirmed) {
        this.tasks = this.tasks.filter(task => task != existingTask)
      }
    }
  
  }
  
  
  class Task {
  
    constructor(public title: string) {
  
    }
  
    toggleIsDone() {
      this.isDone = !this.isDone;
    }
  
    public isDone = false;
  
}
