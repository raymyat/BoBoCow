import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { job } from '../models/job.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-employee-feed',
  templateUrl: './employee-feed.component.html',
  styleUrls: ['./employee-feed.component.scss']
})
export class EmployeeFeedComponent implements OnInit {
  jobPosts: jobPost[] = [];
  _id:String;
  title: String;
  description: String;
  user_id: String;
  start_date: String;
  end_date: String;
  company_id: String;
  specialization: String;
  created_date: String;
  deadline: String;
  require_skills: String;

  constructor(public dialog: MatDialog, private _user: UserService) {
    this._user.user().subscribe(
      data => {
        this.assignPersonalData(data);
        console.log(this.user_id);
        this._user.getFeed(this.user_id).subscribe(
          data => {
            this.assignJobData(data);
            console.log(data);

          },
          error =>{
            error => console.log("fail to load feed")

          }
        );
      },
      error => console.log("fail")
    );
  }
  assignPersonalData(data) {
    this.user_id = data._id;
  }
  
  assignJobData(data) {
    this._id = data._id;
    this.title = data.title;
    this.description = data.description;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.company_id = data.company_id;
    this.specialization = data.specialization;
    this.created_date = this.created_date;
    this.deadline = this.deadline;
    this.require_skills = this.require_skills;
  }
  ngOnInit() {
  }

}
export interface jobPost {
  _id: String;
  title: String;
  description: String;
  start_date: String;
  end_date: String;
  company_id: String;
  specialization: String;
  created_date: String;
  deadline: String;
  require_skills: String;
  require_trait_needs: Array<String>;
  require_trait_personality: Array<String>;
  require_trait_values: Array<String>;
}

@Component({
  selector: 'app-view-internship',
  templateUrl: './view-internship.html',
})
export class ViewInternship {

  constructor(
    public dialogRef: MatDialogRef<ViewInternship>,
    @Inject(MAT_DIALOG_DATA) public data: job) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}