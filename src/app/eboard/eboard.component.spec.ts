import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EboardComponent } from './eboard.component';

describe('EboardComponent', () => {
  let component: EboardComponent;
  let fixture: ComponentFixture<EboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
