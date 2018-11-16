import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import {
  MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user_type: String = '';
  num_of_login: Number = 0;
  hide = true;
  action = "close";
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  })

  constructor(private _router: Router, private _user: UserService,
    public snackbar: MatSnackBar) {
  }

  ngOnInit() {
  }

  firsttimeLogin(data) {
    this.num_of_login = data.num_of_login;
    this.user_type = data.user_type;
    console.log(data.num_of_login)
  }

  moveToRegister() {
    this._router.navigate(['/register']);
  }
  invalidSnackBar(message: string, action: string) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.panelClass = ['error-snackbar'];
    this.snackbar.open(message, action, config);

  }

  login() {
    if (!this.loginForm.valid) {
      console.log('Invalid ');
      this.invalidSnackBar("Invalid Email/Password", this.action);
      return;

    }
    this._user.login(JSON.stringify(this.loginForm.value)).subscribe(
      data => {
        console.log(data);
        this._user.user().subscribe(
          data => {
            this.firsttimeLogin(data);
            if (this.num_of_login > 1) {
              if (this.user_type == "Company") {
                //this._router.navigate(['/company-feed']);
                this._router.navigate(['/first-login']);


              } else if (this.user_type == "Employee") {
                this._router.navigate(['/employee-feed']);
              }

            } else if (this.num_of_login <= 1) {
              if (this.user_type == "Company") {
                this._router.navigate(['/first-login']);


              } else if (this.user_type == "Employee") {
                this._router.navigate(['/first-login']);
              }
            }
          },
          error => console.log(this.num_of_login)

        );


      },//this._router.navigate(['/user']); 
      error => { console.error(error); this.invalidSnackBar("Invalid Email/Password", this.action); }

    )

  }

}
