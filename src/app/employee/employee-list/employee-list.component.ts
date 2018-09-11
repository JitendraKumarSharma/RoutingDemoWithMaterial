import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../employee';
import { MatPaginator, MatTableDataSource, MatSort, MatFooterRow } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { SelectionModel } from '@angular/cdk/collections';
import { forEach } from '@angular/router/src/utils/collection';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { isObject } from 'util';
import { ProgressSpinnerDialogComponent } from '../../globals/progress-spinner-dialog/progress-spinner-dialog.component';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Global } from '../../globals/global';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {

  //v = [];

  constructor(
    private empService: EmployeeService,
    private dialog: MatDialog,
    private _flashMessagesService: FlashMessagesService,
    private _global: Global
  ) {
    // let observable = new Observable(this.myObservable);
    // this.showProgressSpinnerUntilExecuted(observable);
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
  empSelArr: Employee[] = [];
  empDel: Employee;
  empId: number;
  private dialogRef;
  hasFilterValue: boolean = false;

  pageSizes = [5, 10, 20];
  pageSize: number;
  checked1 = false;
  flag = 0;
  cnt = 0;

  color = 'accent';
  checked = false;
  disabled = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("filterText") elFilter: ElementRef;

  displayedColumns: string[] = ['Select', 'Name', 'Email', 'Age', 'City', 'ZipCode', 'Mobile', 'Gender', 'IsMarried', 'DOB', 'Action'];
  dataSource: MatTableDataSource<Employee>;
  selection = new SelectionModel<Employee>(true, []);


  mapProp: any;

  latitude: number;
  longitude: number;

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.longitude = +pos.coords.longitude;
      this.latitude = +pos.coords.latitude;
    });

    this.getAllEmployee().then(value => {
      let sort1 = this.Sort1();
      let filter1 = this.Filter1();
    });
  }

  Sort1() {
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }
      return data[sortHeaderId];
    };
  }

  Filter1() {
    this.dataSource.filterPredicate = function (data, filter): boolean {
      return data.Name.toLowerCase().includes(filter);
    };
  }

  getAllEmployee() {
    return new Promise(resolve => {
      this.empService.getEmployeeDB()
        .subscribe(
          data => {
            this.empList = data;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.sortingDataAccessor = (data, header) => data[header];
            resolve();
          });
    });
  }

  isMarried(event, row) {
    row.IsMarried = event.checked == true ? true : false;
    this.updateMaritalStatus(row);
    console.log(event);
  }

  updateMaritalStatus(row) {
    let newEmployee: Employee;
    newEmployee = row;
    this.empService.updateEmployeeDB(newEmployee)
    .subscribe(
            data => {
              if (data == 0) {
                this._flashMessagesService.show('Some Error Occured!!', { cssClass: 'alert-danger', timeout: 2000 });
              }
              else {
                this._flashMessagesService.show('Marital Status Updated Successfully!!', { cssClass: 'alert-success', timeout: 2000 });
              }
            });
    return status;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.elFilter.nativeElement.value != "")
      this.hasFilterValue = true;
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
    if (this.isAllSelected()) {
      this.selection.clear();
      this.dataSource.data.forEach(row => {
        this.empSelArr.splice(this.empSelArr.indexOf(row), 1)
      });
    }
    else {
      this.dataSource.data.forEach(row => {
        this.selection.select(row);
        this.empSelArr.push(row);
      });

    }
    // this.isAllSelected() ?
    //   this.selection.clear() :
    //   this.dataSource.data.forEach(row => this.selection.select(row));
  }

  masterToggleOnLoad() {
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

  checkbox(empObj: Employee) {
    debugger
    if (this.empSelArr.find(x => x == empObj)) {
      this.empSelArr.splice(this.empSelArr.indexOf(empObj), 1);
    }
    else {
      this.empSelArr.push(empObj);

    }
  }

  openDialog(deleteEmp, emp): void {
    if (isObject(emp)) {
      this.flag = 1;
      this.empDel = emp;
    }
    else {
      this.flag = 0;
    }

    this.dialogRef = this.dialog.open(deleteEmp);
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  close() {
    this.dialogRef.close();
    this.flag = 0;
  }

  save() {
    debugger
    this.dialogRef.close();
    this.deleteEmployee();
  }

  deleteEmployee() {
    debugger
    if (this.flag == 1) {
      var self = this;
      var promise = new Promise(function (reslove, reject) {
        self.dialogRef = self.dialog.open(ProgressSpinnerDialogComponent, self._global.dialogConfig);
        self.empService.deleteEmployeeByEmpIdDB(self.empDel.EmpId)
          .subscribe(
            data => {
              self.dialogRef.close();
              self.empId = data;
              reslove(self.empId);
            });
      });
      promise.then(function (res) {
        self.getAllEmployee();
        self._flashMessagesService.show('Employee Deleted Successfully!!', { cssClass: 'alert-success', timeout: 2000 });
      });
    }
    else if (this.flag == 0) {
      this.deleteSelectedEmployee();
    }
  }

  deleteSelectedEmployee() {
    var self = this;
    var promoise = new Promise(function (resolve, reject) {
      self.dialogRef = self.dialog.open(ProgressSpinnerDialogComponent, self._global.dialogConfig);
      for (self.cnt = 0; self.cnt < self.empSelArr.length; self.cnt++) {
        if (self.empList.find(x => x == self.empSelArr[self.cnt])) {
          self.empService.deleteEmployeeByEmpIdDB(self.empSelArr[self.cnt].EmpId)
            .subscribe(
              data => {
                self.dialogRef.close();
                self.empId = data;
                resolve(self.empId);
              });
        }
      }
    });
    promoise.then(function (res) {
      self.empSelArr = [];
      self.getAllEmployee();
      self._flashMessagesService.show('Employee Deleted Successfully!!', { cssClass: 'alert-success', timeout: 2000 });
    });
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

  yourEventHandler(event) {
    this.pageSize = event.pageSize;
  }

  clearFilterSubscriber(): void {
    this.elFilter.nativeElement.value = "";
    this.hasFilterValue = false;
    this.getAllEmployee().then(value => {
      let sort1 = this.Sort1();
      let filter1 = this.Filter1();
    });
  }
}
