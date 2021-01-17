import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Global } from '../global';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public errorMsg: any;
  private dialogRef;

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private _flashMessagesService: FlashMessagesService,
    private _global: Global,
    private router: Router,
    private dialog: MatDialog,
  ) {
    _global.isUserLoggedIn = localStorage.getItem('access_token') != null ? true : false;
    this.loginForm = formBuilder.group(
      {
        email: [null, [Validators.email,Validators.required]],
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
    this.dialogRef = this.dialog.open(ProgressSpinnerDialogComponent, this._global.dialogConfig);
    this.empService.loginUser(email, password)
      .subscribe(
        data => {
          if (data != null) {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('userName', data.userName);
            this.router.navigate(['employee']);
            this.dialogRef.close();
          }
        },
        error => {
          if (error.status == 0) {
            this.errorMsg = "API is not running!!";
          }
          else {
            this.errorMsg = error.error.error_description;
          }
          this._flashMessagesService.show(this.errorMsg, { cssClass: 'alert-danger', timeout: 2000 });
          this.dialogRef.close();
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
