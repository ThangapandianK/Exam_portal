import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDesignComponent } from './login-design.component';

describe('LoginDesignComponent', () => {
  let component: LoginDesignComponent;
  let fixture: ComponentFixture<LoginDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
