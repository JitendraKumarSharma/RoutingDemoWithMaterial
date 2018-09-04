import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../employee';
import { Country } from '../../globals/country';
import { State } from '../../globals/state';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProgressSpinnerDialogComponent } from '../../globals/progress-spinner-dialog/progress-spinner-dialog.component';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private dialog: MatDialog,
    private _flashMessagesService: FlashMessagesService,
  ) {
    this.empForm = formBuilder.group({
      emp_name: [null, Validators.required],
      //site_url: [null, Validators.pattern('^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$')],
      emp_age: [null, Validators.required],
      //last_name: [null, Validators.required],
      //middle_name: [null],
      emp_email: [null, Validators.email],
      emp_country: ['', Validators.required],
      emp_state: ['', Validators.required],
      emp_city: [null, Validators.email],
      emp_zipcode: [null, Validators.email],
      emp_mobile: [null, Validators.email],
      emp_gender: [null, Validators.required],
      emp_ismarried: [null, Validators.required],
      emp_dob: [null, Validators.required],
      //phone: [null, Validators.pattern("[0-9]{10}")],
      //username: [null, Validators.minLength(5)],
      //password: [null, Validators.minLength(8)],
      //confirm_password: [null, Validators.required]
    }
      // , {
      //     validator: PasswordValidation.MatchPassword // your validation method
      // }
    );
  }

  @Input() viewEmpData: any;
  @Output() toggleForm = new EventEmitter<boolean>();

  empForm: FormGroup;
  countryList: Country[];
  stateList: State[];
  private dialogRef;

  ngOnInit() {
    debugger
    setTimeout(() => {
      this.dialogRef = this.dialog.open(ProgressSpinnerDialogComponent)
    })
    this.getAllCountry().then(value => {
      if (this.viewEmpData) {
        this.empForm.setValue({
          'emp_name': this.viewEmpData.Name,
          'emp_email': this.viewEmpData.Email,
          'emp_age': this.viewEmpData.Age,
          'emp_country': this.viewEmpData.CountryId,
          'emp_state': this.viewEmpData.StateId,
          'emp_city': this.viewEmpData.City,
          'emp_zipcode': this.viewEmpData.ZipCode,
          'emp_mobile': this.viewEmpData.Mobile,
          'emp_gender': this.viewEmpData.Gender,
          'emp_ismarried': this.viewEmpData.IsMarried,
          'emp_dob': this.viewEmpData.DOB
          // 'last_name': this.editSubscriberData.last_name,
          // 'email': this.editSubscriberData.email,
          // 'phone': this.editSubscriberData.phone,
          // 'username': this.editSubscriberData.username,
          // 'password': '',
          // 'confirm_password': ''
        });
      }
      this.dialogRef.close();
    });
  }

  backToList(): void {
    this.toggleForm.emit();
  }

  //Code to enter only number
  keyPress(event: any) {
    //const pattern = /[0-9\+\-\ ]/;// Number with + and - sign
    const pattern = /[0-9]/; // Only Numbers

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  ////////////////////

  getAllCountry() {
    return new Promise(resolve => {
      this.empService.getAllCountry()
        .subscribe(
          data => {
            this.countryList = data;
            if (this.viewEmpData !== undefined && this.viewEmpData.CountryId > 0) {
              this.getStateByCountry(1, this.viewEmpData.CountryId).then(value => {
                resolve();
              });
            }
            else {
              this.empForm.controls['emp_country'].setValue(this.countryList[0].CountryId);
              this.getStateByCountry(0, this.countryList[0].CountryId).then(value => {
                resolve();
              });
            }
          });
    });
  }

  getStateByCountry(flag: number, country_id: number) {
    return new Promise(resolve => {
      this.empService.getStateByCountry(country_id)
        .subscribe(
          data => {
            this.stateList = data;
            if (this.viewEmpData !== undefined && this.viewEmpData.StateId > 0 && flag == 1) {
              resolve();
            }
            else {
              this.empForm.controls['emp_state'].setValue(this.stateList[0].StateId);
              resolve();
            }
          });
    });
  }
}
