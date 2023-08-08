import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TodolistsService } from './todolists.service';

describe('TodolistsService', () => {
  let service: TodolistsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodolistsService],
    });
    service = TestBed.inject(TodolistsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get all data', () => {
    const mockData = [
      { id: 1, task: 'Task 1', isDone: false },
      { id: 2, task: 'Task 2', isDone: false },
    ];

    service.getAllData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:3000/todolists');
    expect(req.request.method).toBe('GET');
  });


  it('should post data', () => {
    const postData = { task: 'New Task', isDone: false };

    service.postData(postData).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/todolists');
    expect(req.request.method).toBe('POST');
  });


  it('should update data', () => {
    const id = 1;
    const updateData = { task: 'Updated Task' };

    service.updateData(updateData, id).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:3000/todolists/${id}`);
    expect(req.request.method).toBe('PATCH');
  });

  
  it('should delete data', () => {
    const id = 1;

    service.deleteData(id).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:3000/todolists/${id}`);
    expect(req.request.method).toBe('DELETE');
  });
});
