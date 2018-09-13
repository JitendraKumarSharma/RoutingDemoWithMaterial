import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.regForm = formBuilder.group(
      {
        user_name: [null, Validators.required],
        user_email: [null, Validators.email],
        user_password: [null, Validators.required, Validators.minLength(8)],
        user_conPassword: [''],
      }
      , {
        validator: this.MatchPassword // your validation method
      }
    );
  }

  MatchPassword(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.user_password.value;
    let confirmPass = group.controls.user_conPassword.value;

    return pass === confirmPass ? null : { not: true }
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {

  }
}
