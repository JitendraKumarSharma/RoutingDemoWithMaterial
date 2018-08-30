import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../employee';
import { MatPaginator, MatTableDataSource, MatSort, MatFooterRow } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {

  constructor(
    private empService: EmployeeService
  ) { }

  empList: Employee[];

  pageSizes = [5, 10, 20];
  pageSize: number;
  checked1 = false;
  flag = 0;
  tot = 0;
  cnt = 0;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // debugger

  displayedColumns: string[] = ['Select', 'Name', 'Email', 'Age', 'City', 'ZipCode', 'Mobile', 'Gender', 'IsMarried', 'DOB'];
  dataSource: MatTableDataSource<Employee>;
  selection = new SelectionModel<Employee>(true, []);

  ngOnInit() {
    this.empService.getEmployeeDB()
      .subscribe(
        data => {
          this.empList = data;
          this.dataSource = new MatTableDataSource(this.empList);
        });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(event) {
    console.log(event);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  //Get Complete Row Data
  getmsg(row) {
    if (this.flag == 0) {
      alert(row.Name);
      return true;
    }
    else {
      this.flag = 0;
      return false;
    }
  }

  // yourEventHandler(event) {
  //   this.pageSize = event.pageSize;
  //   this.cnt = 0;
  //   this.tot = 0;
  // }
}
