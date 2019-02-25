import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerAddComponent } from './lecturer-add.component';

describe('LecturerAddComponent', () => {
  let component: LecturerAddComponent;
  let fixture: ComponentFixture<LecturerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
