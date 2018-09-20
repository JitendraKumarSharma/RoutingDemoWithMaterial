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
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './globals/login/login.component';
import { RegisterComponent } from './globals/register/register.component';
import { MatInputModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    AppComponent,
    ProgressSpinnerDialogComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDulMGKW2_9pqB-Ey_Fc2SdENaPEOojSE0",
      libraries: ["places"]
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FlashMessagesModule.forRoot(),
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [Global, EmployeeService],
  bootstrap: [AppComponent],
  entryComponents: [
    ProgressSpinnerDialogComponent
  ]
})
export class AppModule { }
