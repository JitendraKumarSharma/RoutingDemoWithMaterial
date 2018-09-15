import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Global } from '../global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public errorMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private _flashMessagesService: FlashMessagesService,
    private _global: Global,
    private router: Router
  ) {
    _global.isUserLoggedIn = localStorage.getItem('access_token') != null ? true : false;
    this.loginForm = formBuilder.group(
      {
        email: [null, Validators.email],
        password: [null, Validators.required],
      }
    );
  }

  ngOnInit() {
  }

  login() {
    debugger
    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value;
    this.empService.loginUser(email, password)
      .subscribe(
      data => {
        debugger
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('userName', data.userName);
        this.router.navigate(['employee']);
        // this._flashMessagesService.show("User Login Successfully!!", { cssClass: 'alert-success', timeout: 2000 });
        // this.reset();
      },
      error => {
        this.errorMsg = error.error.error_description;
        this._flashMessagesService.show(this.errorMsg, { cssClass: 'alert-danger', timeout: 2000 });
      }
      );
  }

  register() {
    this.router.navigate(['register']);
  }

  reset() {
    this.loginForm = this.formBuilder.group(
      {
        email: [null, Validators.email],
        password: [null, Validators.required],
      }
    );
    return false;
  }

}
