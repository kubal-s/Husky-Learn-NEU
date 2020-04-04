import { Injectable } from '@angular/core';
import { apiconfig } from '../config/apiconfig';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false); 

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
    return this.http.post<any>(api, JSON.stringify({user : userDetails}),this.httpOptions).
    pipe(
    map((res: Response) => {
      this.loggedIn.next(true);
      return res || {}
    }),
    catchError(this.errorHandl));
  }

  setAuthToken(data :any){
    localStorage.setItem('access_token', data.user.token);
  }

  getAuthToken(){
    return localStorage.getItem('access_token');
  }
  // Error handling
  errorHandl(error:any) {
    return throwError(error.error);
  }

  isLogged(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  setLogout(){
    let removeToken = localStorage.removeItem('access_token');
    this.loggedIn.next(false);
  }

  logout() {
    let removeToken = this.setLogout();
    if (removeToken == null) {
      this.router.navigate(['signin']);
    }
  }
}
