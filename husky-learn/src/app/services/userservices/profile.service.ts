import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiService } from '../../sharedservices/http-request-custom';
import { map, catchError } from 'rxjs/operators';
import { Profile } from 'src/app/model/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService:ApiService) { }
  save(userDetails): Observable<any> {
    return this.apiService.post('/users', { user : userDetails })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  getUser():Observable<any>{
    return this.apiService.get('/user')
    .pipe(
    map((res: Response) => {
    return res || {}
    }),

    catchError(this.errorHandl));
    }
    updateUser(user, userDetails):Observable<any>{
      return this.apiService.put('/user', {user: userDetails})
      .pipe(
      map((res: Response) => {
      return res || {}
      }),
      catchError(this.errorHandl));
      }
      getProfiles(username): Observable<any> {
        return this.apiService.get('/profiles/' + username)
        .pipe(
          map((res: Response) => {
          return res || {}
          }),
          catchError(this.errorHandl));

      }
      followUser(username):Observable<any>{
        return this.apiService.post('/profiles/' + username + '/follow')
        .pipe(
        map((res: Response) => {
        return res || {}
        }),
        catchError(this.errorHandl));
        }
        unfollowUser(username):Observable<any>{
          return this.apiService.delete('/profiles/' + username + '/follow')
          .pipe(
          map((res: Response) => {
          return res || {}
          }),
          catchError(this.errorHandl));
          }

    errorHandl(error:any) {
    return throwError(error);
    }

}

