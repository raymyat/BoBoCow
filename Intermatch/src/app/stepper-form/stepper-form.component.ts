import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';

export interface Specialization {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepper-form.component.html',
  styleUrls: ['./stepper-form.component.scss']
})
export class StepperFormComponent implements OnInit {
  //chips
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  //mat-stepper
  isLinear = false;
  user_type: String = '';
  user_email: String = '';
  user_name: String = '';
  _id: String = '';
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
  employeeDetails: boolean = false;
  companyDetails: boolean = false;

  userDetails(data) {
    this.user_email = data.email;
    this.user_name = data.username;
    this.user_type = data.user_type;
    this._id = data._id;

  }
  //forms
  profileFormGroup: FormGroup;
  educationFormGroup: FormGroup;
  experienceFormGroup: FormGroup;
  companyFormGroup: FormGroup;

  educations: FormArray;
  experiences: FormArray;

  constructor(private _formBuilder: FormBuilder, private _user: UserService,
    private router: Router) {
    this._user.user().subscribe(
      data => {
        this.userDetails(data);
        console.log(this.user_type);
        if (this.user_type == "Employee") {
          this.employeeDetails = true;
          console.log(this.employeeDetails);
        } else if (this.user_type == "Company") {
          this.companyDetails = true;
        }

      },
      error => console.log('error')
    );


  }



  ngOnInit() {

    //employee form
    this.profileFormGroup = this._formBuilder.group({
      email: [ '',Validators.required],
      username: [ '',Validators.required],
      full_name: ['', Validators.required],
      birthdate: ['', Validators.required],
      description: this._formBuilder.group({
        content: ['', Validators.required]
      }),
      specialization: ['', [Validators.required]],
      skill: this._formBuilder.array([])

    });

    this.educationFormGroup = this._formBuilder.group({

      educations: this._formBuilder.array([this.createEdu()])

    });
    this.experienceFormGroup = this._formBuilder.group({
      experiences: this._formBuilder.array([this.createExp()])
    });
    //company form
    this.companyFormGroup = this._formBuilder.group({
      email:[''],
      username:[''],
      company_name: ['', Validators.required],
      bio: ['', Validators.required],
      address: ['', Validators.required],
      phone_no: ['', Validators.required],
      company_type: ['', Validators.required],

    });
  }
  //mat-chips
  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our requirement
    if ((value || '').trim()) {
      const skills = this.profileFormGroup.get('skill') as FormArray;
      skills.push(this._formBuilder.control(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(index: number): void {
    const skills = this.profileFormGroup.get('skill') as FormArray;

    if (index >= 0) {
      skills.removeAt(index);
    }
  }

  //employee submit
  onSubmit() {
    this.profileFormGroup.controls.email.setValue(this.user_email);
    this.profileFormGroup.controls.username.setValue(this.user_name);
    this._user.updateProfile(this._id, this.user_type, JSON.stringify(this.profileFormGroup.value)).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/employee-feed']);
      },
      error => {
        console.log("fail to updateProfile")
      }

    );
  }
  //company submit
  saveProfile() {
    this.companyFormGroup.controls.email.setValue(this.user_email);
    this.companyFormGroup.controls.username.setValue(this.user_name);
    this._user.updateProfile(this._id, this.user_type, JSON.stringify(this.companyFormGroup.value)).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/company-feed']);
      },
      error => {
        console.log("fail to updateProfile")
      }

    );

  }
  //experiences
  createExp(): FormGroup {
    return this._formBuilder.group({
      job_position: [''],
      company_name: [''],
      exp_SD: [''],
      exp_ED: [''],
      exp_descp: ['']
    })
  }
  get expArray(): FormArray {
    return this.experienceFormGroup.get('experiences') as FormArray;
  }
  addExp(): void {
    this.experiences = this.experienceFormGroup.get('experiences') as FormArray;
    this.experiences.push(this.createExp());

  }
  removeExp(i: number) {
    this.expArray.removeAt(i);

  }
  //Educations
  createEdu(): FormGroup {
    return this._formBuilder.group({
      institution_name: [''],
      start_date: [''],
      end_date: [''],
      certification: ['']
    })
  }
  get eduArray(): FormArray {
    return this.educationFormGroup.get('educations') as FormArray;
  }
  addEdu(): void {
    this.educations = this.educationFormGroup.get('educations') as FormArray;
    this.educations.push(this.createEdu());
  }
  removeEdu(i: number) {
    this.eduArray.removeAt(i);

  }
}
