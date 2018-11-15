import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-empolyee-navbar',
  templateUrl: './empolyee-navbar.component.html',
  styleUrls: ['./empolyee-navbar.component.scss']
})
export class EmpolyeeNavbarComponent implements OnInit {

  constructor(private _user:UserService, private _router: Router) { }

  ngOnInit() {
  }
  logout(){
    return this._user.logOut().subscribe(
      data=> {console.log(data); this._router.navigate(['/login'])},
      error=>console.log(error)
    )
  }
  goToEmployeeFeed(){
    this._router.navigate(["/employee-feed"]);
  }
  goToEmployeeAccount(){
    this._router.navigate(["/employee-account"]);
  }

}
