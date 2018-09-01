import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../employee';
import { MatPaginator, MatTableDataSource, MatSort, MatFooterRow } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { SelectionModel } from '@angular/cdk/collections';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {

  //v = [];

  constructor(
    private empService: EmployeeService
  ) {
    // this.v = [{
    //   "add_on_id": "d79ae1a245593552b8d662496f3e5d07", "name": " Color Switcher Left", "location": "Left Sleeve", "ink_count": 2, "pricing": {
    //     "1": ["40", "50", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     "2": ["40", "50", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //   }
    // },
    // {
    //   "add_on_id": "77f93d271eb19067f7a01039c885491b", "name": "Foil", "location": "Front", "ink_count": 4, "pricing": {
    //     "1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     "2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     "3": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     "4": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //   }
    // },
    // {
    //   "add_on_id": "03a42030365d72cbf4d36a019d1eee0a", "name": "Foil", "location": "Back", "ink_count": 2, "pricing": {
    //     "1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     "2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //   }
    // }];

    // for (var x in this.v) {
    //   const mapped = Object.keys(this.v[x].pricing).map(key => ({ 'id': key, 'val': this.v[x].pricing[key] }));
    //   this.v[x].pricing = mapped;
    // }
    // console.log(this.v);
  }


  public showForm = false;
  public viewEmpData: any = {};
  public loading = false;
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
    this.getAllEmployee();
  }

  getAllEmployee() {
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

  toggleForm(loading) {
    if (loading == true) {
      this.viewEmpData = {};
      this.ngOnInit();
    }
    this.showForm = !loading;
    return !this.showForm;
  }

  goToAddEmployee() {
    this.showForm = true;
    this.viewEmpData.EmpId = 0;
  }

  empEditForm(emp: Employee) {
    this.getEmployeeDetail(emp);
    this.showForm = true;
  }

  getEmployeeDetail(emp: Employee) {
    this.empService.getEmployeeByEmpIdDB(emp.EmpId)
      .subscribe(
        data => {
          this.viewEmpData = data[0];
        });
  }

  // yourEventHandler(event) {
  //   this.pageSize = event.pageSize;
  //   this.cnt = 0;
  //   this.tot = 0;
  // }
}
