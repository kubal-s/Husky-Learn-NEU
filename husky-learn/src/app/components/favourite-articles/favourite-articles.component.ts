import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/model/Article';
import { ArticleService } from 'src/app/services/userservices/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-favourite-articles',
  templateUrl: './favourite-articles.component.html',
  styleUrls: ['./favourite-articles.component.scss']
})
export class FavouriteArticlesComponent implements OnInit {
// username;
listOfArticles: Array<Article>;
@Input() username;
  constructor(private articleService : ArticleService, private route: ActivatedRoute, private router: Router) { 
// this.username="";

  }

  ngOnInit(): void {
    this.listOfAllFavoriteArticles();
    // this.articleService.getAllFavoriteArticles(this.username).subscribe(
    //   data => {
    //     this.listOfArticles = data.articles;
      
    //   },
    //   err => {
    //     // this.router.navigate(['/signin']);
    //   });
  }

  toggleFavorite(slug, isfavorite){
    if(!isfavorite){
      this.articleService.getAllFavoriteArticles(this.username).subscribe(
        data => {
        // this.favorite = true;
        this.listOfAllFavoriteArticles();
        },
        err => {
          this.router.navigate(['/signin']);
        });
    }
    else if(isfavorite){
      this.articleService.unfavoriteArticle(slug).subscribe(
        data => {
        // this.favorite = true;
        this.listOfAllFavoriteArticles();
        },
        err => {
          this.router.navigate(['/signin']);
        });
    }

  }
  listOfAllFavoriteArticles(){
    this.articleService.getAllFavoriteArticles(this.username).subscribe(
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
  