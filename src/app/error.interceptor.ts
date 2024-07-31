import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from './auth/services/authentication.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req,next);
  const authservice = inject(AuthenticationService)
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status == 401){
        console.log("got 401");
        authservice.logout();
      }
      return throwError(error);
    })
  );
};
