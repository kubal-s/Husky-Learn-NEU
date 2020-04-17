import { Injectable } from '@angular/core';

import { ApiService } from '../../sharedservices/http-request-custom';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private apiService: ApiService) {

  }
  save(articleDetails): Observable<any> {
    return this.apiService.post('/articles', { article: articleDetails })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  update(slug, articleDetails): Observable<any> {
    return this.apiService.put('/articles/' + slug, { article: articleDetails })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  getAllArticles(): Observable<any> {
    return this.apiService.get('/articles')
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  favoriteArticle(slug):Observable<any>{
    return this.apiService.post('/articles/' + slug + '/favorite')
    .pipe(
    map((res: Response) => {
    return res || {}
    }),
    catchError(this.errorHandl));
    }
  unfavoriteArticle(slug):Observable<any>{
      return this.apiService.delete('/articles/' + slug + '/favorite')
      .pipe(
      map((res: Response) => {
      return res || {}
      }),
      catchError(this.errorHandl));
      }

  postComment(slug, comment): Observable<any> {
    return this.apiService.post('/articles/' + slug + '/comments', { comment: { body: comment } })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  getAllArticlesByUsername(username): Observable<any> {
    return this.apiService.get('/articles?author=' + username)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  getAllFavoriteArticles(username):Observable<any>{
    return this.apiService.get('/articles?favorited=' + username)
    .pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorHandl));
  }
  getAllComments(slug): Observable<any> {
    return this.apiService.get('/articles/' + slug + '/comments')
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  deleteArticle(slug): Observable<any> {
    return this.apiService.delete('/articles/' + slug)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  deleteComment(slug,commentID):Observable<any>{
    return this.apiService.delete('/articles/' + slug +'/comments/'+commentID)
    .pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorHandl));
  }
  errorHandl(error: any) {
    return throwError(error);
  }
}
