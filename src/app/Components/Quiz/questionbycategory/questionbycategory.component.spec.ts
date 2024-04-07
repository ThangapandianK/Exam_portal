import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionbycategoryComponent } from './questionbycategory.component';

describe('QuestionbycategoryComponent', () => {
  let component: QuestionbycategoryComponent;
  let fixture: ComponentFixture<QuestionbycategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionbycategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionbycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
