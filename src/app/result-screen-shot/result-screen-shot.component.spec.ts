import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultScreenShotComponent } from './result-screen-shot.component';

describe('ResultScreenShotComponent', () => {
  let component: ResultScreenShotComponent;
  let fixture: ComponentFixture<ResultScreenShotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultScreenShotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultScreenShotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
