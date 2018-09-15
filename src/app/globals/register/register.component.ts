import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, FormGroupDirective, NgForm } from '@angular/forms';
import { Global } from '../../globals/global';
import { EmployeeService } from '../../services/employee.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AbstractControl } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;
  public errorMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private empService: EmployeeService,
    private _flashMessagesService: FlashMessagesService,
    private _global: Global
  ) {
    _global.isUserLoggedIn = localStorage.getItem('access_token') != null ? true : false;
    this.reset();
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
  }

  public register() {
    let email = this.regForm.controls.user_email.value;
    let password = this.regForm.controls.password.value;
    let confirmPassword = this.regForm.controls.confirm_password.value;
    this.empService.registerUser(email, password, confirmPassword)
      .subscribe(
      data => {
        this._flashMessagesService.show("User Registered Successfully!!", { cssClass: 'alert-success', timeout: 3000 });
        this.reset();
      },
      error => {
        this.errorMsg = error;
        let mappedError;
        for (var x in this.errorMsg.error.ModelState) {
          mappedError = Object.keys(this.errorMsg.error.ModelState[x]).map(key => ({ 'id': key, 'val': this.errorMsg.error.ModelState[x][key] }));
          this.errorMsg.error.ModelState[x] = mappedError;
        }
        for (var err in mappedError) {
          this._flashMessagesService.show(mappedError[err].val, { cssClass: 'alert-danger', timeout: 5000 });
        }
      }
      );
  }

  reset() {
    this.regForm = this.formBuilder.group({
      user_email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirm_password: [null, Validators.required]
    }, {
        validator: Global.MatchPassword
      }
    );
    return false;
  }

}
