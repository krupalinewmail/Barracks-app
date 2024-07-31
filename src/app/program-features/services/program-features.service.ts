import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { bughunter, password, username } from '../../shared/constant';
import { RetentionService } from '../../auth/services/retention.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramFeaturesService {

  baseURL = environment.baseURL;
  authorizationData = 'Basic ' + btoa(username + ':' + password);
 
  constructor(private  httpClient:HttpClient,private retentionService: RetentionService) { }
  getProgramDetails(): any{
    let token = this.retentionService.getItem('token');
    let role = this.retentionService.getItem('userRole');
    let headers = new HttpHeaders().set('Authorization', this.authorizationData);
    
    // console.log(this.role.);
    console.log(role == bughunter);
    if(role == bughunter || role == ''){
      console.log("if");
      return this.httpClient.get(`${this.baseURL}/api/v1/programs`,{ headers: headers });
    }
    else{
      headers = headers.set('x-auth-token', token as  string);
      console.log("else");
      return this.httpClient.get(`${this.baseURL}/api/v1/admin/programs`,{ headers: headers });
    }
    
  }
  
  getProgramByID(programId: any): any{
    let token = this.retentionService.getItem('token');
    let role = this.retentionService.getItem('userRole');
    let headers = new HttpHeaders().set('Authorization', this.authorizationData);
    
    // console.log(this.role.);
    console.log(role == bughunter);
    if(role == bughunter || role == ''){
      console.log("if");
      return this.httpClient.get(`${this.baseURL}/api/v1/programs/${programId}`,{ headers: headers });
    }
    else{
      headers = headers.set('x-auth-token', token as  string);
      console.log("else");
      return this.httpClient.get(`${this.baseURL}/api/v1/admin/programs/${programId}`,{ headers: headers });
    }
  }

  addProgram():any{
    let token = this.retentionService.getItem('token');
    let role = this.retentionService.getItem('userRole');
    let headers = new HttpHeaders().set('Authorization', this.authorizationData);
    
   
      headers = headers.set('x-auth-token', token as  string);
    
      return this.httpClient.post(`${this.baseURL}/api/v1/admin/programs`,{
        "program_name":"Test",
        "source_zip_path":"/etc/hosts"
    },{ headers: headers});
    
    
  }
}
