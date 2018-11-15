import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import {
  MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, MatSlideToggle
} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  //snackbar
  action = "close";
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  checked = false;
  type = "Employee";

  
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required),
    user_type: new FormControl(this.checked)
  });

  //
  constructor(private _router: Router, private _userService: UserService,
    public snackbar: MatSnackBar) { }

  ngOnInit() {

  }

checkusertype( event:any) {
    console.log(event);
    if (event != "Company"){
         this.type = "Employee";
    } else if (event != "Employee"){
        this.type = "Company";
    } 
  }

  moveToLogin() {
    this._router.navigate(['/login']);
  }
  invalidSnackBar(message: string, action: string) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.panelClass = ['error-snackbar'];
    this.snackbar.open(message, action, config);

  }

  register() {
    if (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value) {
      console.log('Invalid Forms'); return;
    }
    else if (!this.registerForm.valid) {
      console.log('Invalid Forms'); return;
    }
    this. registerForm.controls.user_type.setValue(this.type);
    this._userService.register(JSON.stringify(this.registerForm.value))
      .subscribe(
        data => { console.log(data); this._router.navigate(['/login']); },
        error => console.error(error)
      )
  }


}
