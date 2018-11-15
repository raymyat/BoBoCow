import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StepperFormComponent } from './stepper-form/stepper-form.component';
import { CompanyFeedComponent } from './company-feed/company-feed.component';
import { EmployeeFeedComponent } from './employee-feed/employee-feed.component';
import { EmployeeAccountComponent } from './employee-account/employee-account.component';
import { CompanyInternshipsComponent } from './company-internships/company-internships.component';
import { CompanyAccountComponent } from './company-account/company-account.component';

const routes: Routes = [
  {path:'', redirectTo:'landing-page', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'user', component: UserhomeComponent},
  {path:'first-login', component: StepperFormComponent},
  {path:'company-feed', component: CompanyFeedComponent},
  {path:'company-internships', component: CompanyInternshipsComponent},
  {path:'company-account', component: CompanyAccountComponent},
  {path:'employee-feed', component: EmployeeFeedComponent},
  {path:'employee-account', component: EmployeeAccountComponent},
  {path: 'landing-page', component: LandingPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
