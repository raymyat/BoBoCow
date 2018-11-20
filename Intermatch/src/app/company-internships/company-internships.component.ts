import { Component, OnInit, Inject } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { job } from '../models/job.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'app-company-internships',
  templateUrl: './company-internships.component.html',
  styleUrls: ['./company-internships.component.scss'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CompanyInternshipsComponent implements OnInit {

  posted_jobs: job[];
  job_id: string;
  jobDetails: job;
  user_id: string;
  columnsList = ['created_date', 'title', 'deadline'];
  expandedJob: job;
  constructor(public dialog: MatDialog, private _user: UserService, private router: Router) {
    this._user.user().subscribe(
      data => {
        this.getUserDetails(data);
        console.log(this.user_id);
        this.fetchJobs(this.user_id);

      },
      error => {
        console.log("fail to get user_id");
      }
    );

  }
  ngOnInit() {
  }
  getUserDetails(data) {
    this.user_id = data._id;
  }
  fetchJobs(id) {
    this._user.getJobPosting(id).subscribe((data: job[]) => {
      this.posted_jobs = data;
      console.log('Data requested ...');
      console.log(data);
    });

  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CompanyPostInternship, {
      width: '400px'
    });
  }
  openUpdateDialog(job_id): void {
    this.job_id = job_id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.data = {
      id: this.job_id
    }
    const dialogRef = this.dialog.open(CompanyUpdateInternship, dialogConfig);
    console.log(job_id);

  }
}
export interface trait {
  trait_rank: Number;
  trait_name: string;
}
@Component({
  selector: 'company-post-internship',
  templateUrl: 'company-post-internship.html',
})
export class CompanyPostInternship {
  user_id: string;
  postJobForm: FormGroup;
  trait_needs: trait[] = [];
  trait_personality: trait[]=[];
  trait_values: trait[] = [];
  needs = [
    "Curiosity", "Ideal", "Stability", "Liberty", "Excitement", "Structure", "Closeness",
    "Love", "Challenge", "Self-expression", "Practicality", "Harmony"];
  personality = ["Agreeableness", "Conscientiousness", "Openness", "Extraversion ", "Emotional range"];
  values = ["Tradition", "Achievement", "Taking pleasure in life", "Stimulation", "Helping others"];

  ngOnInit() {

    this.postJobForm = this._formBuilder.group({
      title: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      deadline: ['', Validators.required],
      description: ['', Validators.required],
      specialization: ['', Validators.required],
      trait_needs: this._formBuilder.group({
        need_1: [''],
        need_2:[''],
        need_3:[''],
        need_4:[''],
        need_5:['']
      }),
      trait_values: this._formBuilder.group({
        value_1: [''],
        value_2:[''],
        value_3:[''],
        value_4:[''],
        value_5:['']
      }),
      trait_personality: this._formBuilder.group({
        pers_1: [''],
        pers_2:[''],
        pers_3:[''],
        pers_4:[''],
        pers_5:['']
      }),
      require_trait_needs: this._formBuilder.array([{},{},{},{},{}]),
      require_trait_values: this._formBuilder.array([{},{},{},{},{}]),
      require_trait_personality: this._formBuilder.array([{},{},{},{},{}])


    });

  }

  constructor(
    public dialogRef: MatDialogRef<CompanyPostInternship>,
    @Inject(MAT_DIALOG_DATA) public data, private _user: UserService, private _formBuilder: FormBuilder) { }
  getUserDetails(data) {
    this.user_id = data._id;
  }
  
  save() {
    this.trait_needs=[
      {trait_rank:1,trait_name:this.postJobForm.get('trait_needs.need_1').value},
      {trait_rank:2,trait_name:this.postJobForm.get('trait_needs.need_2').value},
      {trait_rank:3,trait_name:this.postJobForm.get('trait_needs.need_3').value},
      {trait_rank:4,trait_name:this.postJobForm.get('trait_needs.need_4').value},
      {trait_rank:5,trait_name:this.postJobForm.get('trait_needs.need_5').value},
    ];
    this.trait_personality=[
      {trait_rank:1,trait_name:this.postJobForm.get('trait_personality.pers_1').value},
      {trait_rank:2,trait_name:this.postJobForm.get('trait_personality.pers_2').value},
      {trait_rank:3,trait_name:this.postJobForm.get('trait_personality.pers_3').value},
      {trait_rank:4,trait_name:this.postJobForm.get('trait_personality.pers_4').value},
      {trait_rank:5,trait_name:this.postJobForm.get('trait_personality.pers_5').value}
    ];
      
    this.trait_values = [
      {trait_rank:1,trait_name:this.postJobForm.get('trait_values.value_1').value},
      {trait_rank:2,trait_name:this.postJobForm.get('trait_values.value_2').value},
      {trait_rank:3,trait_name:this.postJobForm.get('trait_values.value_3').value},
      {trait_rank:4,trait_name:this.postJobForm.get('trait_values.value_4').value},
      {trait_rank:5,trait_name:this.postJobForm.get('trait_values.value_5').value},

    ];

    this.postJobForm.controls.require_trait_needs.setValue(this.trait_needs);
    this.postJobForm.controls.require_trait_values.setValue(this.trait_values);
    this.postJobForm.controls. require_trait_personality.setValue(this.trait_personality);

    console.log(this.trait_needs);
    this.dialogRef.close(this.postJobForm.value);
    if (this.postJobForm.value != null) {
      this._user.user().subscribe(
        data => {
          this.getUserDetails(data)
          this._user.addJobPosting(this.user_id, JSON.stringify(this.postJobForm.value)).subscribe(
            data => {
              console.log(this.postJobForm.value);
              this.dialogRef.close();
            }
            ,
            error => console.log("fail adding job")
          );
        },
        error => console.log("fail to get user id for posting job")
      );
      this.dialogRef.close();

    }

  }
  closeDialog(): void {
    this.dialogRef.close();

  }
}

@Component({
  selector: 'company-update-internship',
  templateUrl: 'company-update-internship.html',
})
export class CompanyUpdateInternship {
  id: string;
  jobDetails: any = {};
  updateJobForm: FormGroup;
  creteForm() {
    this.updateJobForm = this._formBuilder.group({
      title: ['', Validators.required],
      start_date: [''],
      end_date: [''],
      deadline: [''],
      description: [''],
      specialization: ['']
    });

  }


  ngOnInit() {


  }
  constructor(
    public dialogRef: MatDialogRef<CompanyUpdateInternship>,
    @Inject(MAT_DIALOG_DATA) public data, private _user: UserService, private _formBuilder: FormBuilder) {
    this.id = data.id;
    console.log("id " + this.id);
    this.creteForm();
    this._user.getJobPostingById(this.id).subscribe(
      (data) => {
        this.jobDetails = data;
        this.updateJobForm.get('title').setValue(this.jobDetails.title);
        this.updateJobForm.get('start_date').setValue(this.jobDetails.start_date);
        this.updateJobForm.get('end_date').setValue(this.jobDetails.end_date);
        this.updateJobForm.get('deadline').setValue(this.jobDetails.deadline);
        this.updateJobForm.get('description').setValue(this.jobDetails.description);
        this.updateJobForm.get('specialization').setValue(this.jobDetails.specialization);
      }

    );


  }
  save(title, start_date, end_date, deadline, description, specialization) {
    console.log(this.id);
    this._user.editJobPosting(this.id, title, start_date, end_date, deadline, description, specialization).subscribe(
      data => {
      }
    );
    this.dialogRef.close();

  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
