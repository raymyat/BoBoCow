import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatPaginator } from '@angular/material';
@Component({
  selector: 'app-company-feed',
  templateUrl: './company-feed.component.html',
  styleUrls: ['./company-feed.component.scss']
})
export class CompanyFeedComponent implements OnInit {
  _id: String;
  employee_user_id: String;
  employeeList: employee[] = [];
  full_name: String;
  employee_id: String;
  description: String;
  constructor(public dialog: MatDialog, private _user: UserService, private router: Router) {
    this._user.user().subscribe(
      data => {
        this.getDetails(data);
        console.log(this._id);
        this._user.getFeed(this._id).subscribe(
          (data: employee[]) => {
            this.employeeList = data;
            console.log(data);
          }
        );

      },
      error => ("failure")
    );
  }
  getDetails(data) {
    this._id = data._id;
  }
  openViewDialog(employee_id): void {
    this.employee_id = employee_id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.data = {
      id: this.employee_id
    }
    const dialogRef = this.dialog.open(ViewProfile, dialogConfig);
    console.log(employee_id)
  }
  ngOnInit() {
  }

}

export interface employee {
  id: String;
  user_type: String;
  full_name: String;
  birthdate: String;
  description: description;
  specialization: String;
  matched_jobs: matched_jobs;

}
export interface description {
  id: String;
  content: String;
  created: String;
}
export interface matched_jobs {
  id: String;
  company_id: String;
  matched_date: String;
  job_id: String;
}
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.html',
})
export class ViewProfile {
  user_id: string;
  id: string;
  employeeDetails: any = {};
  job_title: string
  user_type: String;
  full_name: String;
  birthdate: String;
  description: description;
  specialization: String;
  job_detail: any = {};
  job_list: any[] = [];
  job_name_list: any[] = [];




  constructor(
    public dialogRef: MatDialogRef<ViewProfile>,
    @Inject(MAT_DIALOG_DATA) public data, private _user: UserService) {
    this.id = data.id;
    console.log("id" + this.id);
    this._user.user().subscribe(
      data => {
        this.getDetails(data);
        this._user.getUserProfile(this.id).subscribe(
          data => {
            this.employeeDetails = data;
            console.log(data);
            this.full_name = this.employeeDetails.usertypeSchema.full_name;
            this.description = this.employeeDetails.usertypeSchema.description[0].content;
            this.birthdate = this.employeeDetails.usertypeSchema.birthdate;
            this.specialization = this.employeeDetails.usertypeSchema.specialization;
            for (var i = 0; i < this.employeeDetails.usertypeSchema.potentional_jobs.length; i++) {
              console.log(this.employeeDetails.usertypeSchema.potentional_jobs[i].company_id, this.user_id);
              if (this.employeeDetails.usertypeSchema.potentional_jobs[i].company_id === this.user_id) {
                this.job_list.push(this.employeeDetails.usertypeSchema.potentional_jobs[i].job_id);
              }
            } console.log(this.job_list);
            for (var i = 0; i < this.job_list.length; i++) {
              this._user.getJobPostingById(this.job_list[i]).subscribe(
                data => {
                  this.job_detail = data;
                  this.job_title = this.job_detail.title;
                  this.job_name_list.push(this.job_title);
                }
              ); console.log(this.job_name_list);
            }
          }//
        );
      }
    );

  }
  getDetails(data) {
    this.user_id = data._id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}