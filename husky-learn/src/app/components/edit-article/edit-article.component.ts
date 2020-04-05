import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/userservices/article.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {


  articleForm: any;
  error = false;
  errorList;
  currentArticle = null;
  slug = null;
  constructor(private  articleService: ArticleService, private router: Router) { 
    this.currentArticle = null;
    if(this.router.getCurrentNavigation().extras.hasOwnProperty('state')&&this.router.getCurrentNavigation().extras.state.hasOwnProperty('article')){
      this.currentArticle = this.router.getCurrentNavigation().extras.state.article;
      console.log(this.currentArticle)
      this.slug = this.currentArticle.slug;
    }
    
    //console.log(this.router.getCurrentNavigation().extras.state)
  }

  ngOnInit(): void {
    //   if(this.currentArticle = !null){
    //     this.articleForm = new FormGroup({
    //       title:  new FormControl(this.currentArticle.title),
    //       description: new FormControl(this.currentArticle.description),
    //       body: new FormControl(this.currentArticle.body),
    //       tags:new FormControl(this.currentArticle.tagList)

    //     });
    //   }
    //   else{
    //     this.articleForm = new FormGroup({
    //       title:  new FormControl(""),
    //       description: new FormControl(""),
    //       body: new FormControl(""),
    //       tags:new FormControl("")
    //   })
    // }
  }

}
