import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { CustomerService } from './services/customer.service';
import { Global } from './globals/global';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressSpinnerDialogComponent } from './globals/progress-spinner-dialog/progress-spinner-dialog.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
  declarations: [
    AppComponent,
    ProgressSpinnerDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [Global],
  bootstrap: [AppComponent],
  entryComponents: [
    ProgressSpinnerDialogComponent
  ]
})
export class AppModule { }
