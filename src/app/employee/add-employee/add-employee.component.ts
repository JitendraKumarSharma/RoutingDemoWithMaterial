import { Component, OnInit, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../employee';
import { Country } from '../../globals/country';
import { State } from '../../globals/state';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProgressSpinnerDialogComponent } from '../../globals/progress-spinner-dialog/progress-spinner-dialog.component';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Global } from '../../globals/global';
declare const myExtObject: any;

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
    private _global: Global

  ) {
    this.empForm = formBuilder.group({
      emp_id: [null, Validators.nullValidator],
      emp_name: [null, Validators.required],
      //site_url: [null, Validators.pattern('^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$')],
      emp_age: [null, Validators.required],
      //last_name: [null, Validators.required],
      //middle_name: [null],
      emp_email: [null, Validators.email],
      emp_country: ['', Validators.required],
      emp_state: ['', Validators.required],
      emp_city: [null, Validators.required],
      emp_zipcode: [null, Validators.required],
      emp_mobile: [null, Validators.required],
      emp_gender: [null, Validators.required],
      emp_ismarried: [null, Validators.nullValidator],
      emp_dob: [null, Validators.required]
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
  url: string = this._global.imageUrl;
  empImage: string = "blank.png";

  latitude: number;
  longitude: number;
  locationChosen = false;

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.longitude = +pos.coords.longitude;
      this.latitude = +pos.coords.latitude;
    });
    setTimeout(() => {
      this.dialogRef = this.dialog.open(ProgressSpinnerDialogComponent, this._global.dialogConfig)
    })
    this.getAllCountry().then(value => {
      if (this.viewEmpData) {
        this.empForm.setValue({
          'emp_id': this.viewEmpData.EmpId,
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
        });
        if (this.viewEmpData.EmpImage != null && this.viewEmpData.empImage != "")
          this.empImage = this.viewEmpData.EmpImage;
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

  onSubmit() {
    debugger
    console.log(this.empForm);
    if (this.empForm.valid) {
      if (this.empForm.controls.emp_id.value > 0) {
        this.updateEmployee();
      }
      else {
        this.createEmployee();
      }

      console.log('form submitted');
    } else {
      this.validateAllFormFields(this.empForm);
    }
  }

  public createEmployee() {
    this.EmployeeAction("Insert");
  }
  public updateEmployee() {
    this.EmployeeAction("Update");
  }

  @ViewChild("photo") el: ElementRef;
  public EmployeeAction(action: string) {
    debugger
    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement;
    let fileCount: number = inputEl.files.length;
    if (fileCount > 0) {
      let splitlength: number = (inputEl.files[0].name).split('.').length;
      let ext: string = (inputEl.files[0].name).split('.')[splitlength - 1];
      if (ext.toLowerCase() != "jpg" && ext.toLowerCase() != "png") {
        this._flashMessagesService.show('Please select image file!!', { cssClass: 'alert-danger', timeout: 2000 });
        return false;
      }
    }

    let newEmployee: Employee;
    const now = new Date(this.empForm.controls.emp_dob.value);
    newEmployee = {
      EmpId: this.empForm.controls.emp_id.value,
      Name: this.empForm.controls.emp_name.value,
      Email: this.empForm.controls.emp_email.value,
      Age: this.empForm.controls.emp_age.value,
      CountryId: this.empForm.controls.emp_country.value,
      StateId: this.empForm.controls.emp_state.value,
      City: this.empForm.controls.emp_city.value,
      ZipCode: this.empForm.controls.emp_zipcode.value,
      Mobile: this.empForm.controls.emp_mobile.value,
      Gender: this.empForm.controls.emp_gender.value,
      IsMarried: this.empForm.controls.emp_ismarried.value == null ? false : this.empForm.controls.emp_ismarried.value,
      DOB: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
      EmpImage: ""
    };
    this.dialogRef = this.dialog.open(ProgressSpinnerDialogComponent, this._global.dialogConfig)
    var self = this;
    var promise = new Promise(function (resolve, reject) {
      if (action == "Update") {
        self.empService.updateEmployeeDB(newEmployee)
          .subscribe(
            data => {
              if (data == 0) {
                resolve("Employee Alreay Exists!!");
              }
              else {
                self.empForm.controls['emp_id'].setValue(data);
                resolve("Employee Updated Successfully!!");
              }
            });
      }
      else if (action == "Insert") {
        self.empService.insertEmployeeDB(newEmployee)
          .subscribe(
            data => {
              if (data == 0) {
                resolve("Employee Alreay Exists!!");
              }
              else {
                self.empForm.controls['emp_id'].setValue(data);
                resolve("Employee Added Successfully!!");
              }
            });
      }
    });
    promise.then(function (msg: string) {
      if (msg != "Employee Alreay Exists!!") {
        //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
        if (fileCount > 0) {
          var pic;
          //create a new fromdata instance
          let formData = new FormData();
          //append the key name 'photo' with the first file in the element
          formData.append('photo', inputEl.files.item(0));
          let id = self.empForm.controls.emp_id.value;
          formData.append('id', id === undefined || id == null ? '0' : id.toString());
          var promoise1 = new Promise(function (resolve, reject) {
            self.empService.uploadImage(self.empForm.controls.emp_id.value, formData).subscribe(
              data => {
                inputEl.value = "";
                self.empImage = data;
                resolve(self.empImage);
              }
            );
          });
          promoise1.then(function (res: string) {
            self.empForm.controls['emp_id'].setValue(0);
            if (action == "Insert") {
              newEmployee.EmpImage = res;
              self.empService.sendEmail(newEmployee)
                .subscribe(
                  data => {
                    self.resetAfterSaveUpdate(msg);
                  });
            }
            else {
              self.resetAfterSaveUpdate(msg);
            }
          });
        }
        else {
          self.resetAfterSaveUpdate(msg);
        }
      }
      else {
        self._flashMessagesService.show(msg, { cssClass: 'alert-danger', timeout: 2000 });
      }
    });
  }

  resetAfterSaveUpdate(msg) {
    this._flashMessagesService.show(msg, { cssClass: 'alert-success', timeout: 2000 });
    this.reset();
    this.dialogRef.close();
  }

  reset() {
    this.empImage = "blank.png";
    myExtObject.resetImage(this.url, this.empImage);
    this.empForm.reset();
    this.getAllCountry();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

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

  onChoseLocation(event) {
    console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
  }
}
