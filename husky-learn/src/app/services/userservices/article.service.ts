import { Injectable } from '@angular/core';

import { ApiService } from '../../sharedservices/http-request-custom';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private apiService:ApiService) { 

  }
  save(articleDetails):Observable<any>{
    return this.apiService.post('/articles' , {article : articleDetails})
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
