import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, FormGroupDirective, NgForm } from '@angular/forms';
import { Global } from '../../globals/global';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.regForm = this.formBuilder.group({
      user_email: [null, Validators.email],
      password: [null, Validators.required],
      confirm_password: [null, Validators.required]
    }, {
        validator: Global.MatchPassword
      }
    );
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {

  }
}
