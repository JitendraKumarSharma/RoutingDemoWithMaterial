import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
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
    private global: Global
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
  url: string = this.global.imageUrl;
  empImage: string = "blank.png";

  ngOnInit() {
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
        });
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
    console.log(this.empForm);
    if (this.empForm.valid) {
      // if (this.Id_M > 0) {
      //   this.updateEmployee();
      // }
      // else {
      //   this.createEmployee();
      // }

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

  public EmployeeAction(action: string) {
    // debugger
    // //locate the file element meant for the file upload.
    // let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    // if (inputEl.files.length > 0) {
    //   this.empImage = inputEl.files[0].name;
    // }
    // let newEmployee: Employee;
    // newEmployee = {
    //   EmpId: this.Id_M,
    //   Name: this.Name_M,
    //   Email: this.Email_M,
    //   Age: this.Age_M,
    //   CountryId: this.country_M,
    //   StateId: this.state_M,
    //   City: this.City_M,
    //   ZipCode: this.ZipCode_M,
    //   Mobile: this.Mobile_M,
    //   Gender: this.Gender_M,
    //   IsMarried: this.IsMarried_M == null ? false : this.IsMarried_M,
    //   DOB: new Date(this.DOB_M.year, this.DOB_M.month - 1, this.DOB_M.day + 1),
    //   EmpImage: this.empImage == "blank.png" ? "" : this.empImage
    // };
    // var self = this;
    // var promise = new Promise(function (resolve, reject) {
    //   if (action == "Update") {
    //     self.employeeService.updateEmployeeDB(newEmployee)
    //       .subscribe(
    //         data => {
    //           //if (data[0][0].EmpId == 0) {
    //           if (data == 0) {
    //             resolve("Employee Alreay Exists!!");
    //           }

    //           else {
    //             self.Id_M = data;
    //             self.url1 = self.global.imageUrl + "/" + self.empImage;
    //             resolve("Employee Updated Successfully!!");
    //           }
    //         });
    //   }
    //   else if (action == "Insert") {
    //     self.employeeService.insertEmployeeDB(newEmployee)
    //       .subscribe(
    //         data => {
    //           //self.Id_M = data[0][0].EmpId;
    //           if (data == 0) {
    //             resolve("Employee Alreay Exists!!");
    //           }
    //           else {
    //             self.Id_M = data;
    //             var prms = new Promise(function (reslove, reject) {
    //               self.employeeService.sendEmail(newEmployee)
    //                 .subscribe(
    //                   data => {
    //                     self.url1 = self.global.imageUrl + "/" + self.empImage;
    //                     resolve("Employee Added Successfully!!");
    //                   });
    //             });
    //           }
    //         });
    //   }
    // });
    // promise.then(function (msg) {
    //   if (msg != "Employee Alreay Exists!!") {
    //     //get the total amount of files attached to the file input.
    //     let fileCount: number = inputEl.files.length;
    //     if (fileCount > 0) {
    //       //Check File Extention
    //       let splitlength: number = (inputEl.files[0].name).split('.').length;
    //       let ext: string = (inputEl.files[0].name).split('.')[splitlength - 1];
    //       if (ext.toLowerCase() == "jpg" || ext.toLowerCase() == "png") {
    //         var pic;
    //         var promoise1 = new Promise(function (resolve, reject) {
    //           let id = self.Id_M;
    //           self.employeeService.uploadImage(id).subscribe(
    //             data => {
    //               resolve(data);
    //             }
    //           );
    //         });
    //         promoise1.then(function (res) {
    //           pic = res;
    //           self.Id_M = 0;
    //           self.empImage = pic;
    //           inputEl.value = "";
    //         });
    //       }
    //       else {
    //         alert("Please select image file!!");
    //       }
    //     }
    //     inputEl.value = "";
    //     self.getAllEmployee();
    //     alert(msg);
    //     self.reset();
    //   }
    //   else {
    //     alert(msg);
    //   }
    // });
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
}
