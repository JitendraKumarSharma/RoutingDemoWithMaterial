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

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private _flashMessagesService: FlashMessagesService,
    private _global: Global,
    private router: Router
  ) {
    this.loginForm = formBuilder.group(
      {
        user_email: [null, Validators.email],
        user_password: [null, Validators.required],
      }
    );
  }

  ngOnInit() {
  }

  login() {

  }

  register() {
    this.router.navigate(['register']);
  }
}
