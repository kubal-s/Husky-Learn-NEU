import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ArticleService} from '../../services/userservices/article.service';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit {
  currentArticle;
  commentList;
  constructor(private router: Router,private articleService:ArticleService) { 
    this.currentArticle = null;
  }

  ngOnInit(): void {
    if(history.state.hasOwnProperty('article')){
      this.currentArticle = history.state.article;
      this.updateCommentList();
      console.log(this.currentArticle)
    }
    
    else{
      this.router.navigate(['/home']);
    }
    // if(this.currentArticle)
   // console.log(this.currentArticle)
  }

  toggleFavorite(isfavorite){
    if(!isfavorite){
      this.articleService.favoriteArticle(this.currentArticle.slug).subscribe(
        data => {
          this.currentArticle.favorited = true;
          this.currentArticle.favoritesCount = this.currentArticle.favoritesCount+1;
        // this.favorite = true;
        // this.listAllArticles();
        },
        err => {
          this.router.navigate(['/signin']);
        });
    }
    else if(isfavorite){
      this.articleService.unfavoriteArticle(this.currentArticle.slug).subscribe(
        data => {
          this.currentArticle.favorited = false;
          this.currentArticle.favoritesCount = this.currentArticle.favoritesCount-1;
        // this.favorite = true;
        // this.listAllArticles();
        },
        err => {
          this.router.navigate(['/signin']);
        });
    }
  }
  updateCommentList(){
    this.articleService.getAllComments(this.currentArticle.slug).subscribe(
      data => {
        this.commentList = data.comments;
      },
      err => {
        //console.log(err)
      });
  }
  deleteComment(commentId){
    this.articleService.deleteComment(this.currentArticle.slug,commentId).subscribe(
      data => {
        this.updateCommentList();
      },
      err => {
        //console.log(err)
      });
  }
}
