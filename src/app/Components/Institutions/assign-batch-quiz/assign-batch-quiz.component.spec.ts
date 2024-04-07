import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBatchQuizComponent } from './assign-batch-quiz.component';

describe('AssignBatchQuizComponent', () => {
  let component: AssignBatchQuizComponent;
  let fixture: ComponentFixture<AssignBatchQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignBatchQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignBatchQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
