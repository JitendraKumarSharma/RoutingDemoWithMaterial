import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerService } from '../services/customer.service';

@NgModule({
  imports: [
    //CommonModule,
    CustomerRoutingModule
  ],
  declarations: [],
  providers: [CustomerService]
})
export class CustomerModule { }
