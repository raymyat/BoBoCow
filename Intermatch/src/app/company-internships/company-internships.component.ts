import { Component, OnInit, Inject } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-company-internships',
  templateUrl: './company-internships.component.html',
  styleUrls: ['./company-internships.component.scss'],
  
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CompanyInternshipsComponent implements OnInit {
  created_date:string;
  position: string;
  deadline: string;
  start_date: string;
  end_date: string;
  description: string;

  dataSource = posted_jobs;
  columnsList= ['created_date','position', 'deadline'];
  expandedJob: Job_Position;
  constructor(public dialog: MatDialog) { }
  openDialog(): void{
    const dialogRef = this.dialog.open(CompanyPostInternship,{
      width:'400px',
      data: {created_date: this.created_date,position: this.position, deadline: this.deadline, 
        start_date: this.start_date, end_date: this.end_date, description: this.description}
    });
  }

  openUpdateDialog(): void{
    const dialogRef = this.dialog.open(CompanyUpdateInternship,{
      width:'400px',
      data: {created_date: this.created_date,position: this.position, deadline: this.deadline, 
        start_date: this.start_date, end_date: this.end_date, description: this.description}
    
    })
    
  }
  ngOnInit() {
  }

}
@Component({
  selector: 'company-post-internship',
  templateUrl: 'company-post-internship.html',
})
export class CompanyPostInternship{
  constructor(
    public dialogRef: MatDialogRef<CompanyPostInternship>,
    @Inject(MAT_DIALOG_DATA) public data: Job_Position){ console.log(data)}
  closeDialog(): void{
    this.dialogRef.close();
    
  }
}
 
@Component({
  selector: 'company-update-internship',
  templateUrl: 'company-update-internship.html',
})
export class CompanyUpdateInternship{
  constructor(
    public dialogRef: MatDialogRef<CompanyUpdateInternship>,
    @Inject(MAT_DIALOG_DATA) public data: Job_Position){    }
  closeDialog(): void{
    this.dialogRef.close();
  }
 
}
 
export interface Job_Position {
  created_date:string;
  position: string;
  deadline: string;
  start_date: string;
  end_date: string;
  description: string;
}
const posted_jobs: Job_Position[]=[
  {created_date:"12/5/2018",position:"E-commerce intern",deadline:"12/5/2018",start_date:"12/5/2018",end_date:"12/5/2018",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum mauris ut diam vulputate, nec scelerisque magna maximus. Suspendisse sit amet ex vestibulum, semper nunc quis, consequat arcu. Pellentesque feugiat molestie enim a aliquam. "},
  {created_date:"",position:"",deadline:"",start_date:"",end_date:"",description:""},
  {created_date:"",position:"",deadline:"",start_date:"",end_date:"",description:""},
  {created_date:"",position:"",deadline:"",start_date:"",end_date:"",description:""},
  {created_date:"",position:"",deadline:"",start_date:"",end_date:"",description:""},];
