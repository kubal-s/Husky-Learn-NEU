import { ProfileService } from 'src/app/services/userservices/profile.service';
import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/userservices/article.service';
  import { from } from 'rxjs';
@Component({
  selector: 'app-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss']
})
export class GlobalFeedComponent implements OnInit {

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe(
      data => {
      console.log(data);
      },
      err => {
      console.log(err)
      });
  }

}
