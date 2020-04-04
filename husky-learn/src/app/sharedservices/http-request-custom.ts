import { Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment';
// import { Headers, Http, Response, URLSearchParams } from '@angular/http';
// import { Observable } from 'rxjs/Rx';

import { apiconfig } from '../config/apiconfig';

import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  private setHeaders(): Headers {
    let headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return new Headers(headersConfig);
  }



  endpoint: string = apiconfig.base_url;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private formatErrors(error: any) {
     return Observable.throw(error.json());
  }

  post(path: string, body: Object = {}): Observable<any> { 
    return this.http.post(`${this.endpoint}${path}`, JSON.stringify(body), this.httpOptions)
    .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  errorHandl(error:any) {
    return throwError(error.error);
  }
}