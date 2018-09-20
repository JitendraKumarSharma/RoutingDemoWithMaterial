import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../services/employee.service';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatCheckboxModule, MatCardModule, MatDialogModule } from '@angular/material';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    HttpClientModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDulMGKW2_9pqB-Ey_Fc2SdENaPEOojSE0'
    }),
    MatSlideToggleModule
  ],
  declarations: [
    EmployeeListComponent,
    AddEmployeeComponent
  ],
  providers: [
    EmployeeService
  ]
})
export class EmployeeModule { }
