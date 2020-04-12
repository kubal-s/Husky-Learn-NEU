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
  update(slug,articleDetails):Observable<any>{
    return this.apiService.put('/articles/'+slug , {article : articleDetails})
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  getAllArticles():Observable<any>{
    return this.apiService.get('/articles')
    .pipe(
    map((res: Response) => {
    return res || {}
    }),
    catchError(this.errorHandl));
    }
    // favoriteArticle(slug):Observable<any>{
    //   console.log("Test")
    //   return this.apiService.post('/articles/' + slug + '/favorite')
    //   .pipe(
    //   map((res: Response) => {
    //     console.log(res);
    //   return res || {}
    //   }),
    //   catchError(this.errorHandl));
    //   }
    // unfavoriteArticle(slug):Observable<any>{
    //     console.log("Test2")
    //     return this.apiService.delete('/articles/' + slug + '/favorite')
    //     .pipe(
    //     map((res: Response) => {
    //       console.log(res);
    //     return res || {}
    //     }),
    //     catchError(this.errorHandl));
    //     }

    postComment(slug, comment):Observable<any>{
      return this.apiService.post('/articles/' + slug + '/comments' , { comment: { body: comment } })
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
