import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'employee',
    loadChildren: 'src/app/employee/employee.module#EmployeeModule'
  },
  {
    path: 'customer',
    loadChildren: 'src/app/customer/customer.module#CustomerModule'
  },
  {
    path: '',
    redirectTo: '/employee',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
