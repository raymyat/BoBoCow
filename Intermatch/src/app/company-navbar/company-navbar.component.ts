import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-company-navbar',
  templateUrl: './company-navbar.component.html',
  styleUrls: ['./company-navbar.component.scss']
})
export class CompanyNavbarComponent implements OnInit {

  constructor(private _user:UserService, private _router: Router) { }

  ngOnInit() {
  }
  logout(){
    return this._user.logOut().subscribe(
      data=> {console.log(data); this._router.navigate(['/login'])},
      error=>console.log(error)
    )
  }
  goToCompanyFeed(){
    this._router.navigate(["/company-feed"]);
  }
  goToCompanyAccount(){
    this._router.navigate(["/company-account"]);
  }
  goToCompanyIntern(){
    this._router.navigate(["/company-internships"]);
  }

}
