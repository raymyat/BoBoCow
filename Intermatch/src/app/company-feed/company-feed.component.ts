import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-feed',
  templateUrl: './company-feed.component.html',
  styleUrls: ['./company-feed.component.scss']
})
export class CompanyFeedComponent implements OnInit {
  _id: string;

  constructor(private _user: UserService, private router: Router) { 
    this._user.user().subscribe(
      data =>{
        this.getDetails(data);
        console.log(this._id);

      },
      error => ("failure")
    );
  }
  getDetails(data){
    this._id = data._id;
  }

  ngOnInit() {
  }

}
