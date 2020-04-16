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
  constructor(private router: Router,private articleService:ArticleService) { 
    this.currentArticle = null;
  }

  ngOnInit(): void {
    if(history.state.hasOwnProperty('article')){
      this.currentArticle = history.state.article;
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
}
