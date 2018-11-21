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
  updateCompanyProfile(id,type,company_name, bio, phone_no,company_type,address){
    const company={

      company_name :company_name,
      bio: bio,
      phone_no: phone_no,
      company_type: company_type,
      address: address
    }
    return this._http.patch(`https://agile-bayou-24340.herokuapp.com/users/updateProfile/${id}/${type}`,company,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')

    });
  }
  updateEmployeeProfile(id,type,email,username,full_name,birthdate,description,specialization,skills){
    const employee={
      email: email,
      username: username,
      full_name: full_name,
      birthdate: birthdate,
      description: description, 
      specialization:specialization, 
      skills: skills
    }
    return this._http.patch(`https://agile-bayou-24340.herokuapp.com/users/updateProfile/${id}/${type}`,employee,{
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
  addJobPosting(id, body:any){
    return this._http.post(`https://agile-bayou-24340.herokuapp.com/users/jobposting/add/${id}`,body,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')

    });
  }
  editJobPosting(jobId,title, start_date, end_date, deadline, description, specialization){
    const job ={
      title : title,
      start_date: start_date,
      end_date : end_date,
      deadline : deadline,
      description: description,
      specialization: specialization
    }
    return this._http.patch(`https://agile-bayou-24340.herokuapp.com/users/jobposting/edit/${jobId}`,job);
  }
  getJobPostingById(jobId){
    return this._http.get(`https://agile-bayou-24340.herokuapp.com/users/getJobpostingById/${jobId}`,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')

    });
  }
  
}
