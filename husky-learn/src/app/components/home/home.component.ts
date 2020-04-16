import { Article } from './../../model/Article';
import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/userservices/article.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listOfArticles: Array<Article>;
  // favorite;
  showAdd;
  // Navbarlinks = [
  //   // { path: 'yourfeed', label: 'Your Feed' },
  //   { path: 'globalfeed', label: 'Global Feed' }];
  constructor(private articleService: ArticleService, private router: Router) {
    this.showAdd = false;
  }

  ngOnInit(): void {
    // this.favorite = false;
    this.listAllArticles();
  }

  toggleFavorite(slug, isfavorite){
    if(!isfavorite){
      this.articleService.favoriteArticle(slug).subscribe(
        data => {
        // this.favorite = true;
        this.listAllArticles();
        },
        err => {
          this.router.navigate(['/signin']);
        });
    }
    else if(isfavorite){
      this.articleService.unfavoriteArticle(slug).subscribe(
        data => {
        // this.favorite = true;
        this.listAllArticles();
        },
        err => {
          this.router.navigate(['/signin']);
        });
    }

  }
  listAllArticles(){
    this.articleService.getAllArticles().subscribe(
      data => {
  
      this.listOfArticles = data.articles;
      
      },
      err => {
  
      });
  }
  viewArticle(article){
    this.router.navigate(['/article'],{state : article});
  }

}
