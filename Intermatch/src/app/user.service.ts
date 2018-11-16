import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  register(body:any){
    return this._http.post('http://127.0.0.1:3000/users/register',body,{
      observe:'body',
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }
  login(body:any){
    return this._http.post('http://127.0.0.1:3000/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }
  user(){
    return this._http.get('http://127.0.0.1:3000/users/user',{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }
  logOut(){
    return this._http.get('http://127.0.0.1:3000/users/logout',{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });

  }
  getFeed(id){
    return this._http.patch(`http://127.0.0.1:3000/users/feed/${id}`,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')

    });
  }
  updateProfile(id, type,body:any){
    return this._http.patch(`http://127.0.0.1:3000/users/updateProfile/${id}/${type}`,body,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')

    });
  }
  getUserProfile(id){
    return this._http.patch(`http://127.0.0.1:3000/users/userprofile/${id}`,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')

    });
  }
  getJobPosting(id){
    return this._http.get(`http://127.0.0.1:3000/users/jobposting/${id}`,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')

    });
  }
  addJobPosting(id){
    return this._http.get(`http://127.0.0.1:3000/users/jobposting/add/${id}`,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')

    });
  }
  editJobPosting(jobId){
    return this._http.patch(`http://127.0.0.1:3000/users/jobposting/edit/${jobId}`,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')

    });
  }

}
