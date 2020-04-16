import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit {
  currentArticle;
  constructor() { }

  ngOnInit(): void {
    this.currentArticle = history.state;
    // if(this.currentArticle)
    console.log(this.currentArticle)
  }

}
