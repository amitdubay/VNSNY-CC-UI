import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from '../common/global-contants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  passwordImageURLVisible = '../../assets/images/visibility-icon.svg';
  passwordImageURLHide = '../../assets/images/visibility-hide-icon.svg';
  passwordImageURL = '';
  isDisabled = true;
  classEnable = 'btn-disable';

  @ViewChild('userName', { static: true }) userNameElement: ElementRef;
  myusername = '';

  @ViewChild('password', { static: true }) passwordElement: ElementRef;
  myPassword = '';

  constructor(
    private router: Router,
    usernameElement: ElementRef,
    passwordElement: ElementRef
  ) {
    this.userNameElement = usernameElement;
    this.passwordElement = passwordElement;
  }
  ngOnInit(): void {
    this.passwordImageURL = this.passwordImageURLVisible;
  }

  toggleImage = () => {
    this.passwordImageURL =
      this.passwordImageURL === this.passwordImageURLHide
        ? this.passwordImageURLVisible
        : this.passwordImageURLHide;
    this.passwordElement.nativeElement.type =
      this.passwordImageURL === this.passwordImageURLHide ? 'text' : 'password';
  };
  redirectToDashboard = () => {
    // throw Error(GlobalConstants.errCommonError);
    try {
      this.router.navigateByUrl('/dashboard');
    } catch {
      throw Error(GlobalConstants.errCommonError);
    }
  };

  enableLoginButton = () => {
    try {
      if (
        this.userNameElement.nativeElement.value.length > 0 &&
        this.passwordElement.nativeElement.value.length > 0
      ) {
        this.isDisabled = false;
        this.classEnable = 'btn-primary';
      } else {
        this.isDisabled = true;
        this.classEnable = 'btn-disable';
      }
    } catch (error) {
      throw Error(GlobalConstants.errCommonError);
    }
  };
}
