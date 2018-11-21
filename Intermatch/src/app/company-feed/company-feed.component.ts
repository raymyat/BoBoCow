import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-feed',
  templateUrl: './company-feed.component.html',
  styleUrls: ['./company-feed.component.scss']
})
export class CompanyFeedComponent implements OnInit {
  _id: String;
  employeeList: employee[] = [];
  full_name: String;
  description: String;
  constructor(private _user: UserService, private router: Router) {
    this._user.user().subscribe(
      data => {
        this.getDetails(data);
        console.log(this._id);
        this._user.getFeed(this._id).subscribe(
          (data: employee[]) => {
            //this.getEmployeeDetail(data);
            this.employeeList = data;
            console.log(data);
          }
        )

      },
      error => ("failure")
    );
  }
  getDetails(data) {
    this._id = data._id;
  }
  ngOnInit() {
  }

}

export interface employee{
  id: String;
  user_type: String;
  full_name: String;
  birthdate: String;
  description: description;
  specialization: String;
  matched_jobs: matched_jobs;

}
export interface description{
  id: String;
  content: String;
  created: String;
}
export interface matched_jobs{
  id: String;
  company_id: String;
  matched_date: String;
  job_id: String;
}