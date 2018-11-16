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
  user_id: String='';
  user_type: String = '';
  user_email: String = '';
  user_name: String = '';
  userDetails(data) {
    this.user_id = data._id;
    this.user_email = data.email;
    this.user_name = data.username;
    this.user_type = data.user_type
  }
  profile: boolean = true;
  education: boolean = false;
  experience: boolean = false;
  constructor(private _formBuilder: FormBuilder, private _user: UserService, private router: Router) {
    this._user.user().subscribe(
      data => {
        this.userDetails(data);
        console.log(this.user_id);
        this._user.getUserProfile(this.user_id).subscribe(
          data=>{
            console.log(data);

          },
          error =>{
            console.log('error');

          }
        );

      },
      error => console.log('error')
    );

   }
   onProfile(){
    this.profile = true;
    this.education = false;
    this.experience= false;
   }
   onEducation(){
    this.profile = false;
    this.education = true;
    this.experience= false;
   }
   onExperience(){
    this.profile = false;
    this.education = false;
    this.experience= true;
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

  ngOnInit() {
  }

}
export interface user{
 

}
