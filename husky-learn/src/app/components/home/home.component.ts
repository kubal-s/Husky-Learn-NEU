import { Article } from './../../model/Article';
import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/userservices/article.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listOfArticles: Array<Article>;
  favorite;
  showAdd;
  // Navbarlinks = [
  //   // { path: 'yourfeed', label: 'Your Feed' },
  //   { path: 'globalfeed', label: 'Global Feed' }];
  constructor(private articleService: ArticleService, private router: Router) {
    this.showAdd = false;
  }

  ngOnInit(): void {
    this.favorite = false;
    this.articleService.getAllArticles().subscribe(
      data => {
  
      this.listOfArticles = data.articles;
  
      },
      err => {
  
      });
  }

  // toggleFavorite(slug, isfavorite){
  //   console.log(isfavorite);
  //   if(isfavorite){
  //     console.log("okay");
  //     this.articleService.favoriteArticle(slug).subscribe(
  //       data => {
  //       console.log(data);
  //       this.favorite = true;
  //       },
  //       err => {
  //         this.router.navigate(['/signin']);
  //       console.log(err)
  //       });
  //   }
  //   else if(!isfavorite){
  //     console.log("not okay");
  //     this.articleService.unfavoriteArticle(slug).subscribe(
  //       data => {
  //       console.log(data);
  //       this.favorite = true;
  //       },
  //       err => {
  //         this.router.navigate(['/signin']);
  //       console.log(err)
  //       });
  //   }

  // }


}
