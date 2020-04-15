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


  error = false;
  errorList;
  currentArticle = null;
  slug = null;
  commentList: any;
  constructor(private articleService: ArticleService, private router: Router) {
    this.currentArticle = null;
    if (this.router.getCurrentNavigation().extras.hasOwnProperty('state') && this.router.getCurrentNavigation().extras.state.hasOwnProperty('article')) {
      this.currentArticle = this.router.getCurrentNavigation().extras.state.article;
      this.slug = this.currentArticle.slug;
    }

    //console.log(this.router.getCurrentNavigation().extras.state)
  }

  ngOnInit(): void {
    if (this.slug == null) {
      this.router.navigate(['/newarticle']);
    }
    else {
      this.articleService.getAllComments(this.slug).subscribe(
        data => {
          this.commentList = data.comments;
        },
        err => {
          //console.log(err)
        });
    }
  }
  updateCommentList() {
    this.articleService.getAllComments(this.slug).subscribe(
      data => {
        console.log(data);
        this.commentList = data.comments;
      },
      err => {
        //console.log(err)
      });
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.slug).subscribe(
      data => {
        this.router.navigate(['/newarticle']);
      },
      err => {
        //console.log(err)
      });
  }
  deleteComment(commentId){
    this.articleService.deleteComment(this.slug,commentId).subscribe(
      data => {
        this.updateCommentList();
      },
      err => {
        //console.log(err)
      });
  }
}
