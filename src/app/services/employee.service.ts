import { Injectable } from '@angular/core';
import { Global } from '../globals/global';
import { Employee } from '../employee/employee'

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(
    private http: HttpClient,
    private global: Global
  ) { }



  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  getEmployeeDB() {
    return this.http.get<Employee[]>(this.global.apiUrl + "/employees")
      .pipe(catchError(this.errorHandler));
  }

  getEmployeeByEmpIdDB(Id: number) {
    return this.http.get<Employee[]>(this.global.apiUrl + "/employees/" + Id)
      .pipe(catchError(this.errorHandler));
  }
}
