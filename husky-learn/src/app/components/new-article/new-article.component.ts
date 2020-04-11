import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticleService } from '../../services/userservices/article.service'
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {
  articleForm: any;
  error = false;
  success = false;
  successMsg = "";
  errorList;
  currentArticle: any;
  slug = null;
  constructor(private route: ActivatedRoute,private  articleService: ArticleService, private router: Router) {

    this.slug = null;
   }

  ngOnInit(): void {


    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug')
      this.currentArticle = history.state;

      });
      if(this.currentArticle != null){
        this.articleForm = new FormGroup({
          title:  new FormControl(this.currentArticle.title),
          description: new FormControl(this.currentArticle.description),
          body: new FormControl(this.currentArticle.body),
          tags:new FormControl(this.currentArticle.tagList)

        });
      }
      else{
        this.articleForm = new FormGroup({
          title:  new FormControl(""),
          description: new FormControl(""),
          body: new FormControl(""),
          tags:new FormControl(null)
      })
    }
  }
  onSubmit(){
    let tagList;
    if(this.articleForm.value.tags!=null){
      this.articleForm.value.tags = this.articleForm.value.tags+"";
      tagList = this.articleForm.value.tags.split(',');
    }
    this.articleForm.value.tagList = tagList;
    if(this.slug!= null){
      this.articleService.update(this.slug,this.articleForm.value).subscribe(
        data => {
            this.successMsg = "Successfully Updated!"
            this.success = true;
            //this.router.navigate(['/editor'],{state : data});
        },
        err => {
          this.errorList = err;
          this.error = true;
        });
    }
    else{
      this.articleService.save(this.articleForm.value).subscribe(
        data => {
            this.successMsg = "Article successfully created!"
            this.success = true;
            this.router.navigate(['/editor'],{state : data});
        },
        err => {
          this.errorList = err;
          this.error = true;
        });
    }

  }

}
