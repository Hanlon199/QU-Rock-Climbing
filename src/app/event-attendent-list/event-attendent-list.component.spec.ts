import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAttendentListComponent } from './event-attendent-list.component';

describe('EventAttendentListComponent', () => {
  let component: EventAttendentListComponent;
  let fixture: ComponentFixture<EventAttendentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAttendentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAttendentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
