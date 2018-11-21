import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserService } from '../user.service';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
export interface Skill {
  name: string;
}
export interface Specialization {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-employee-account',
  templateUrl: './employee-account.component.html',
  styleUrls: ['./employee-account.component.scss']
})
export class EmployeeAccountComponent implements OnInit {
  //mat-chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills: Skill[] = [];
  user_id: string;
  user_type: string;
  employeeDetails: any = {};
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
  getUserDetails(data) {
    this.user_id = data._id;
    this.user_type = data.user_type
  }

  profile: boolean = true;
  education: boolean = false;
  experience: boolean = false;
  profileFormGroup : FormGroup;
  educationFormGroup: FormGroup;
  experienceFormGroup: FormGroup;
  educations: FormArray;
  experiences: FormArray;
  constructor(private _formBuilder: FormBuilder, private _user: UserService, private router: Router) {
    this._user.user().subscribe(
      data => {
        this.getUserDetails(data);
        console.log(this.user_id);
        this._user.getUserProfile(this.user_id).subscribe(
          data => {
            this.employeeDetails = data;
            console.log(data);
            this.profileFormGroup.get('email').setValue(this.employeeDetails.email);
            this.profileFormGroup.get('username').setValue(this.employeeDetails.username);
            this.profileFormGroup.get('birthdate').setValue(this.employeeDetails.birthdate);
            this.profileFormGroup.get('description').setValue(this.employeeDetails.description);
            this.profileFormGroup.get('specialization').setValue(this.employeeDetails.specialization);
          },error => console.log('error to get userprofile'));
         },
      error => console.log('error')
    );

  }
  updateProfile(company_name, email,username,full_name,birthdate,description,specialization,skills) {
    this._user.updateEmployeeProfile(this.user_id,this.user_type, email,username,full_name,birthdate,description,specialization,skills).subscribe(
      data => {
      }
    );
  }
  ngOnInit() {
    this.profileFormGroup = this._formBuilder.group({
      email: [''],
      username:[''],
      full_name:[''],
      birthdate:[''],
      description:[''],
      specialization:[''],
      skill: this._formBuilder.array([])
    });
    this.educationFormGroup = this._formBuilder.group({

      educations: this._formBuilder.array([this.createEdu()])

    });
    this.experienceFormGroup = this._formBuilder.group({
      experiences: this._formBuilder.array([this.createExp()])
    });

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
  onProfile() {
    this.profile = true;
    this.education = false;
    this.experience = false;
  }
  onEducation() {
    this.profile = false;
    this.education = true;
    this.experience = false;
  }
  onExperience() {
    this.profile = false;
    this.education = false;
    this.experience = true;
  }
  //mat-chip-events
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add skill
    if ((value || '').trim()) {
      this.skills.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }


  remove(skill: Skill): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

}