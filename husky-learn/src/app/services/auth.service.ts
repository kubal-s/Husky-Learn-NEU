import { Injectable } from '@angular/core';
import { apiconfig } from '../config/apiconfig';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = apiconfig.base_url;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) { }


  signUp(userDetails): Observable<any>{
    let api = `${this.endpoint}/users`;
    return this.http.post(api , JSON.stringify({user : userDetails}), this.httpOptions).
    pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorHandl));
  }
 signIn(userDetails: User) {
   let api = `${this.endpoint}/users/login`;
  return this.http.post<any>(api, JSON.stringify({user : userDetails}),this.httpOptions)
    .subscribe((res: any) => {
      localStorage.setItem('access_token', res.token);
      this.router.navigate(['home']);
    },
    catchError(this.errorHandl))
}
    // Error handling
    errorHandl(error:any) {
      return throwError(error.error);
      // console.log(error)
      // Observable.throw(error);
      // return error;
      // let errorMessage = '';
      // if(error.error instanceof ErrorEvent) {
      //   // Get client-side error
      //   errorMessage = error.error.message;
      // } else {
      //   // Get server-side error
      //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      // }
      // console.log(errorMessage);
      // return throwError(errorMessage);
   }
}
