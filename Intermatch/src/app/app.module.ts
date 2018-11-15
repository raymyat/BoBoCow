import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule, MatFormFieldModule, MatButtonModule,
  MatCheckboxModule,MatSlideToggleModule, 
  MatIconModule,MatInputModule,MatSelectModule,
  MatSnackBarModule,MatStepperModule, MatChipsModule,
  MatDatepickerModule,MatNativeDateModule,MatCardModule,MatDialogModule,
  MatTabsModule,MatTableModule} from '@angular/material';
import { StepperFormComponent } from './stepper-form/stepper-form.component';
import { EmpolyeeNavbarComponent } from './empolyee-navbar/empolyee-navbar.component';
import { CompanyNavbarComponent } from './company-navbar/company-navbar.component';
import { CompanyFeedComponent } from './company-feed/company-feed.component';
import { EmployeeFeedComponent, ViewInternship } from './employee-feed/employee-feed.component';
import { EmployeeAccountComponent } from './employee-account/employee-account.component';
import { CompanyAccountComponent } from './company-account/company-account.component';
import { CompanyInternshipsComponent, CompanyPostInternship, CompanyUpdateInternship } from './company-internships/company-internships.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserhomeComponent,
    LandingPageComponent,
    StepperFormComponent,
    EmpolyeeNavbarComponent,
    CompanyNavbarComponent,
    CompanyFeedComponent,
    EmployeeFeedComponent,
    ViewInternship,
    EmployeeAccountComponent,
    CompanyAccountComponent,
    CompanyInternshipsComponent,
    CompanyPostInternship,
    CompanyUpdateInternship
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    //Angular Material
    MatToolbarModule,
    MatFormFieldModule, 
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatTableModule
  ],
  entryComponents: [EmployeeFeedComponent, ViewInternship, CompanyInternshipsComponent, CompanyPostInternship,CompanyUpdateInternship],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
