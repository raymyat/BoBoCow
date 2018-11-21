import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig , MatPaginator} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee-feed',
  templateUrl: './employee-feed.component.html',
  styleUrls: ['./employee-feed.component.scss']
})
export class EmployeeFeedComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  jobPosts: jobPost[] = [];
  filteredPosts: Observable<jobPost[]>;
  filterbar = new FormControl();
  job_id:String;
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
          (data: jobPost[]) => {
            this.jobPosts = data;
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
  
  openViewDialog(job_id):void{
    this.job_id = job_id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.data = {
      id: this.job_id
    }
    const dialogRef = this.dialog.open(ViewInternship,dialogConfig);
    console.log(job_id)
  }
  ngOnInit() {
    //this.jobPosts.paginator = this.paginator;
    this.filteredPosts = this.filterbar.valueChanges.pipe (startWith(''),
    map(value => this._filter(value))
  );
  }
  private _filter(value: string): jobPost[] {
    const filterValue = value.toLowerCase();

    return this.jobPosts.filter(option => {
      option.title.toLowerCase().includes(filterValue);
    option.description.toLowerCase().includes(filterValue);
  });
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
  id: string;
  jobDetails: any={};
  companyDetails: any ={};
  title: String;
  description: String;
  start_date: String;
  end_date: String;
  specialization: String;
  created_date: String;
  deadline: String;
  company_id: String;
  company_name: String;


  constructor(
    public dialogRef: MatDialogRef<ViewInternship>,
    @Inject(MAT_DIALOG_DATA) public data,private _user: UserService ) { 
      this.id = data.id;
      console.log("id" + this.id);
      this._user.getJobPostingById(this.id).subscribe(
        data=>{
          this.jobDetails = data;
          this.title = this.jobDetails.title;
          this.description = this.jobDetails.description;
          this.start_date = this.jobDetails.start_date;
          this.end_date = this.jobDetails.end_date;
          this.specialization = this.jobDetails.specialization;
          this.created_date = this.jobDetails.created_date;
          this.deadline = this.jobDetails.deadline;
          this.company_id = this.jobDetails.company_id;
          this._user.getUserProfile(this.company_id).subscribe(
            data =>{
              this.companyDetails = data;
              console.log(data);
              this.company_name = this.companyDetails.usertypeSchema.company_name;

            }
          )
        }
      )
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}