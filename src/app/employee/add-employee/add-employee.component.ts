import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  empForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.empForm = formBuilder.group({
      emp_name: [null, Validators.required],
      //site_url: [null, Validators.pattern('^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$')],
      emp_age: [null, Validators.required],
      //last_name: [null, Validators.required],
      //middle_name: [null],
      emp_email: [null, Validators.email],
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

  ngOnInit() {
    debugger
    if (this.viewEmpData) {
      this.empForm.setValue({
        'emp_name': this.viewEmpData.Name,
        'emp_email': this.viewEmpData.Email,
        'emp_age': this.viewEmpData.Age
        // 'middle_name': this.editSubscriberData.middle_name,
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
}
