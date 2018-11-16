import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  register(body:any){
    return this._http.post('https://agile-bayou-24340.herokuapp.com/users/register',body,{
      observe:'body',
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }
  login(body:any){
    return this._http.post('https://agile-bayou-24340.herokuapp.com/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }
  user(){
    return this._http.get('https://agile-bayou-24340.herokuapp.com/users/user',{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }
  logOut(){
    return this._http.get('https://agile-bayou-24340.herokuapp.com/users/logout',{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });

  }
  getFeed(id){
    return this._http.patch(`https://agile-bayou-24340.herokuapp.com/users/feed/${id}`,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')

    });
  }
  updateProfile(id, type, body:any){
    return this._http.patch(`https://agile-bayou-24340.herokuapp.com/users/updateProfile/${id}/${type}`,body,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')

    });
  }
  getUserProfile(id){
    return this._http.get(`https://agile-bayou-24340.herokuapp.com/users/userprofile/${id}`,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')

    });
  }
  getJobPosting(id){
    return this._http.get(`https://agile-bayou-24340.herokuapp.com/users/jobposting/${id}`,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')

    });
  }
  addJobPosting(id){
    return this._http.get(`https://agile-bayou-24340.herokuapp.com/users/jobposting/add/${id}`,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')

    });
  }
  editJobPosting(jobId){
    return this._http.patch(`https://agile-bayou-24340.herokuapp.com/users/jobposting/edit/${jobId}`,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')

    });
  }

}
