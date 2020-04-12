import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/Article';
import { ArticleService } from 'src/app/services/userservices/article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favourite-articles',
  templateUrl: './favourite-articles.component.html',
  styleUrls: ['./favourite-articles.component.scss']
})
export class FavouriteArticlesComponent implements OnInit {
  username;
  listOfArticles: Array<Article>;
    constructor(private articleService : ArticleService, private route: ActivatedRoute) { 
  this.username="";
  
    }
  
    ngOnInit(): void {
      
      this.route.paramMap.subscribe(params => {
        this.username = params.get('username')
        if(this.username)
        {
          this.articleService.getAllArticlesByUsername(this.username).subscribe(
          data => {
            this.listOfArticles = data.articles;
                },
          err => {
            // this.errorList = err;
            // this.error = true;
          });
        }
        });
  
  
    }
  }
  