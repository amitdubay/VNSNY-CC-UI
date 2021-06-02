import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('redirect to dashboard', () => {
    spyOn(component, 'redirectToDashboard');
    component.redirectToDashboard();
    expect(component.redirectToDashboard).toHaveBeenCalled();
  });

  it('to enable login button when username and password length is greater than 0', () => {
    spyOn(component, 'enableLoginButton').and.callThrough();
    component.userNameElement.nativeElement.value = 1;
    component.passwordElement.nativeElement.value = 1;
    component.enableLoginButton();
    expect(component.isDisabled).toEqual(false);
  });
});
