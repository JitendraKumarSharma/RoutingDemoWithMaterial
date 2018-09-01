import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../employee';
import { Country } from '../../globals/country';
import { State } from '../../globals/state';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService
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
      emp_mobile: [null, Validators.email]
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

  ngOnInit() {
    this.getAllCountry();
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
        // 'last_name': this.editSubscriberData.last_name,
        // 'email': this.editSubscriberData.email,
        // 'phone': this.editSubscriberData.phone,
        // 'username': this.editSubscriberData.username,
        // 'password': '',
        // 'confirm_password': ''
      });
    }
  }

  backToList(): void {
    this.toggleForm.emit();
  }

  getAllCountry() {
    this.empService.getAllCountry()
      .subscribe(
        data => {
          this.countryList = data;
          this.empForm.controls['emp_country'].setValue(this.countryList[0].CountryId);
          if (this.viewEmpData !== undefined && this.viewEmpData.CountryId > 0) {
            this.empForm.controls['emp_country'].setValue(this.viewEmpData.CountryId);
            this.getStateByCountry(this.viewEmpData.CountryId);
          }
          else {
            this.getStateByCountry(this.countryList[0].CountryId);
          }

        });
  }

  getStateByCountry(countryId: number) {
    this.empService.getStateByCountry(countryId)
      .subscribe(
        data => {
          this.stateList = data;
          if (this.viewEmpData !== undefined && this.viewEmpData.StateId > 0) {
            this.empForm.controls['emp_state'].setValue(this.viewEmpData.StateId);
          }
          else {
            this.empForm.controls['emp_state'].setValue(this.stateList[0].StateId);
          }
        });
  }
}
