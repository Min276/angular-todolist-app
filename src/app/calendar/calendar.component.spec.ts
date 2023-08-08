import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [MatDatepickerModule, MatNativeDateModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default selected date', () => {
    expect(component.selectedDate).toBeDefined();
    expect(component.selectedDate instanceof Date).toBe(true);
  });

  it('should render a link to "Tasks List Page"', () => {
    const linkElement = fixture.nativeElement.querySelector('a');
    expect(linkElement.textContent).toContain('Tasks List Page');
    expect(linkElement.getAttribute('routerLink')).toBe('/tasks');
  });

  it('should bind selectedDate to mat-calendar', () => {
    const calendarElement = fixture.nativeElement.querySelector('mat-calendar');
    expect(calendarElement).toBeTruthy();

    const calendarComponent = fixture.componentInstance;
    const today = new Date();
    expect(calendarComponent.selectedDate.toDateString()).toBe(
      today.toDateString()
    );

    const newDate = new Date();
    calendarComponent.selectedDate = newDate;
    fixture.detectChanges();

    expect(calendarComponent.selectedDate.toDateString()).toBe(
      newDate.toDateString()
    );
  });
});
