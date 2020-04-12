import { Article } from './../../model/Article';
import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/userservices/article.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listOfArticles: Array<Article>;
  // Navbarlinks = [
  //   // { path: 'yourfeed', label: 'Your Feed' },
  //   { path: 'globalfeed', label: 'Global Feed' }];
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe(
      data => {
      console.log(data);
      this.listOfArticles = data.articles;
      console.log(this.listOfArticles)
      },
      err => {
      console.log(err)
      });
  }

}
