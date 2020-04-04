import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {
  articleForm: any;

  constructor() { }

  ngOnInit(): void {
    this.articleForm = new FormGroup({
      title:  new FormControl(''),
      description: new FormControl(''),
      body: new FormControl('')
    })
  }
  onSubmit(){
    console.log(this.articleForm.value)
  }

}
