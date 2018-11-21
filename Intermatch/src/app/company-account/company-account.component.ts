import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
export interface Specialization {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-company-account',
  templateUrl: './company-account.component.html',
  styleUrls: ['./company-account.component.scss']
})



export class CompanyAccountComponent implements OnInit {
  user_id: string;
  user_type:string;
  companyFormGroup: FormGroup;
  companyDetails: any = {};
  specializations: Specialization[] = [
    { value: "specialization-01", viewValue: "Computers and Technology" },
    { value: "specialization-02", viewValue: "Health Care and Allied Health" },
    { value: "specialization-03", viewValue: "Education and Social Services" },
    { value: "specialization-04", viewValue: "Arts and Communications" },
    { value: "specialization-05", viewValue: "Trades and Transportation" },
    { value: "specialization-06", viewValue: "Management, Business, and Finance" },
    { value: "specialization-07", viewValue: "Architecture and Civil Engineering" },
    { value: "specialization-08", viewValue: "Science" },
    { value: "specialization-09", viewValue: "Hospitality, Tourism, and the Service Industry" },
    { value: "specialization-10", viewValue: "Law and Law Enforcement" },
  ];

  constructor(private _user: UserService,private _router: Router, private _formBuilder: FormBuilder) {
    this._user.user().subscribe(
      data => {
        this.getUserDetails(data);
        this._user.getUserProfile(this.user_id).subscribe(
          data =>{
            console.log(data);
            this.companyDetails = data;
            this.companyFormGroup.get('email').setValue(this.companyDetails.userSchema.email);
            this.companyFormGroup.get('username').setValue(this.companyDetails.userSchema.username);
            this.companyFormGroup.get('company_name').setValue(this.companyDetails.usertypeSchema.company_name);
            this.companyFormGroup.get('bio').setValue(this.companyDetails.usertypeSchema.bio);
            this.companyFormGroup.get('phone_no').setValue(this.companyDetails.usertypeSchema.phone_no);
            this.companyFormGroup.get('company_type').setValue(this.companyDetails.usertypeSchema.company_type);
            this.companyFormGroup.get('address').setValue(this.companyDetails.usertypeSchema.address);
          }
        );
      }
    );
  }
  updateProfile(company_name, bio, phone_no,company_type,address) {
    this._user.updateCompanyProfile(this.user_id,this.user_type, company_name, bio, phone_no,company_type,address).subscribe(
      data => {
      }
    );
  }
  getUserDetails(data) {
    this.user_id = data._id;
    this.user_type = data.user_type
  }


  ngOnInit() {
    this.companyFormGroup = this._formBuilder.group({
      email: [''],
      username: [''],
      company_name: ['', Validators.required],
      bio: ['', Validators.required],
      address: ['', Validators.required],
      phone_no: ['', Validators.required],
      company_type: ['', Validators.required],

    });
  }

}
