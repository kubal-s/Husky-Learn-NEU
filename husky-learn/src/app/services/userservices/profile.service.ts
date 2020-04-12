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
  getUser():Observable<any>{
    return this.apiService.get('/user')
    .pipe(
    map((res: Response) => {
    return res || {}
    }),
    
    catchError(this.errorHandl));
    }
    updateUser(user):Observable<any>{
      return this.apiService.put('/user', {user: user})
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

