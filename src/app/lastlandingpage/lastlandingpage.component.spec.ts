import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastlandingpageComponent } from './lastlandingpage.component';

describe('LastlandingpageComponent', () => {
  let component: LastlandingpageComponent;
  let fixture: ComponentFixture<LastlandingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastlandingpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastlandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
