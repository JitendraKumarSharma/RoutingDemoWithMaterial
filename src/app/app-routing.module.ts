import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './globals/login/login.component';
import { RegisterComponent } from './globals/register/register.component';

// const routes: Routes = [
//   {
//     path: 'employee',
//     loadChildren: 'src/app/employee/employee.module#EmployeeModule'
//   },
//   {
//     path: 'customer',
//     loadChildren: 'src/app/customer/customer.module#CustomerModule'
//   },
//   {
//     path: '',
//     redirectTo: '/employee',
//     pathMatch: 'full'
//   }
// ];

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
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
