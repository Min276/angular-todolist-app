import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TodolistsService } from '../todolists.service';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTodolistService: jasmine.SpyObj<TodolistsService>;

  beforeEach(() => {
    mockTodolistService = jasmine.createSpyObj('TodolistsService', [
      'getAllData',
      'postData',
      'updateData',
      'deleteData',
    ]);

    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{ provide: TodolistsService, useValue: mockTodolistService }],
    });

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('placeholder', 'Enter task item');
    inputElement.value = '';
    component.inputName = {
      nativeElement: inputElement,
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on initialization', () => {
    const testData = [{ id: 1, task: 'Test Task', isDone: false }];
    mockTodolistService.getAllData.and.returnValue(of(testData));

    component.ngOnInit();

    expect(component.tasks).toEqual(testData);
    expect(mockTodolistService.getAllData).toHaveBeenCalled();
  });

  it('should add a new task', () => {
    const newTask = 'New Task';
    mockTodolistService.postData.and.returnValue(of({}));

    component.add(newTask);

    expect(mockTodolistService.postData).toHaveBeenCalledWith({
      task: newTask,
      isDone: false,
    });
    expect(component.inputName.nativeElement.value).toBe('');
    expect(mockTodolistService.getAllData).toHaveBeenCalled();
  });

  it('should update a task', () => {
    const existingTask = { id: 1, task: 'Existing Task', isDone: false };
    const updatedTask = 'Updated Task';
    mockTodolistService.updateData.and.returnValue(of({}));

    component.updateTask(existingTask, updatedTask);

    expect(component.selectedItemId).toBe(existingTask.id);
    expect(component.isEdit).toBe(true);
    expect(mockTodolistService.updateData).toHaveBeenCalledWith(
      { task: updatedTask },
      existingTask.id
    );
    expect(mockTodolistService.getAllData).toHaveBeenCalled();
  });

  it('should update task status', () => {
    const existingTask = { id: 1, task: 'Test Task', isDone: false };
    mockTodolistService.updateData.and.returnValue(of({}));

    component.updateStatus(existingTask);

    expect(mockTodolistService.updateData).toHaveBeenCalledWith(
      { isDone: true },
      existingTask.id
    );
    expect(mockTodolistService.getAllData).toHaveBeenCalled();
  });

  it('should remove a task', () => {
    const existingTaskId = 1;
    mockTodolistService.deleteData.and.returnValue(of({}));

    component.remove(existingTaskId);

    expect(mockTodolistService.deleteData).toHaveBeenCalledWith(existingTaskId);
    expect(mockTodolistService.getAllData).toHaveBeenCalled();
  });
});
