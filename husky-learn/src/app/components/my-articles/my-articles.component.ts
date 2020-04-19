import { Component, OnInit, Input } from '@angular/core';
import {ArticleService} from '../../services/userservices/article.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/Article';
@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.scss']
})
export class MyArticlesComponent implements OnInit {
// username;
listOfArticles: Array<Article>;

slug = null;
@Input() username;
  constructor(private articleService : ArticleService, private route: ActivatedRoute, private router: Router) { 
// this.username="";

  }

  ngOnInit(): void {
    this.listAllArticles();
  }


  deleteArticle(slug) {
    this.articleService.deleteArticle(slug).subscribe(
      data => {
        this.listAllArticles();
        // this.router.navigate(['/newarticle']);
      },
      err => {
        //console.log(err)
      });
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
    this.articleService.getAllArticlesByUsername(this.username).subscribe(
      data => {
  
      this.listOfArticles = data.articles;
      
      },
      err => {
  
      });
  }
  viewArticle(article){
    this.router.navigate(['/article'],{state : {'article':article}});
  }
}