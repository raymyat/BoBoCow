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
  jobPost: any[];
 
  title: String;
  description:String;
  _id:String='';
  openDialog(): void {

  
    const dialogRef = this.dialog.open(ViewInternship, {
      width: '250px',
      data: { name: this.title, description: this.description }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  constructor(public dialog: MatDialog,private _user:UserService) { 
    this._user.user().subscribe(
      data=> {
        this.assigndata(data);
        console.log(this._id);
        this._user.getFeed(this._id).subscribe(
          data=>{
            this.jobPost.push(data);
            console.log(this.jobPost);
          },
          error =>console.log("fail to get feed")
        );
      },
      error=>console.log("fail")
    );
  }
  assigndata(data){
    this._id = data._id;
  }
  ngOnInit() {
  }

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