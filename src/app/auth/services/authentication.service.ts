import { Injectable } from '@angular/core';
import { UserDetail } from '../models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { password, username } from '../../shared/constant';
import { RetentionService } from './retention.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseURL = environment.baseURL;
  token = this.retentionService.getItem('token');
  constructor(private httpClient: HttpClient, private retentionService: RetentionService) { }
  isLoggedIn = false;
  
  logout(){
    this.retentionService.setItem('token','');
    this.retentionService.setItem('userRole','');
    this.isLoggedIn = false
  }
  authenticateUser(userDetail: UserDetail): any {
    let authorizationData = 'Basic ' + btoa(username + ':' + password);

    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authorizationData,
        'Accept-Encoding': 'gzip, deflate, br'
      })
    };
    return this.httpClient.post(`${this.baseURL}/api/v1/users/login`, userDetail, headerOptions);
  }
  registerUser(userDetail: any): any {
    let authorizationData = 'Basic ' + btoa(username + ':' + password);

    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Authorization': authorizationData,


      })
    };
    return this.httpClient.post(`${this.baseURL}/api/v1/users/signup`, userDetail, headerOptions);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
