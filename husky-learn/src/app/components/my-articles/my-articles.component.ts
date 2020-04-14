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
@Input() username;
  constructor(private articleService : ArticleService, private route: ActivatedRoute) { 
// this.username="";

  }

  ngOnInit(): void {
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
    // this.route.paramMap.subscribe(params => {
    //   this.username = params.get('username')
    //   if(this.username)
    //   {
    //     this.articleService.getAllArticlesByUsername(this.username).subscribe(
    //     data => {
    //       this.listOfArticles = data.articles;
    //           },
    //     err => {
    //       // this.errorList = err;
    //       // this.error = true;
    //     });
    //   }
    //   });


  }
}
