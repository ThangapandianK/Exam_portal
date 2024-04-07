import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultKeyCountComponent } from './result-key-count.component';

describe('ResultKeyCountComponent', () => {
  let component: ResultKeyCountComponent;
  let fixture: ComponentFixture<ResultKeyCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultKeyCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultKeyCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
