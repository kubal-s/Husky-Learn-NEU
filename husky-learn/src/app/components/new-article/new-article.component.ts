import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticleService } from '../../services/userservices/article.service'

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {
  articleForm: any;
  error = false;
  errorList;
  constructor(private  articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleForm = new FormGroup({
      title:  new FormControl(''),
      description: new FormControl(''),
      body: new FormControl(''),
      tags:new FormControl('')

    })
  }
  onSubmit(){
    let tagList = this.articleForm.value.tags.split(',');
    this.articleForm.value.tagList = tagList;
    this.articleService.save(this.articleForm.value).subscribe(
      data => {
          console.log(data)
      },
      err => {
        this.errorList = err;
        this.error = true;
      });
  }

}
