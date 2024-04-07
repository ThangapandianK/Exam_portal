import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserAnswerComponent } from './view-user-answer.component';

describe('ViewUserAnswerComponent', () => {
  let component: ViewUserAnswerComponent;
  let fixture: ComponentFixture<ViewUserAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
