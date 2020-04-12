import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArticleService } from '../../services/userservices/article.service'
@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  addCommentForm: FormGroup;
  successMessage;
  success;
  error;
  errorList;

  @Input() slug;
  constructor(private articleService : ArticleService) {
    this.success = false;
    this.error = false;
   }

  ngOnInit(): void {
    console.log(this.slug);
    this.addCommentForm = new FormGroup({
      comment: new FormControl('')
    })
  }

  onSubmit(){
    this.articleService.postComment(this.slug, this.addCommentForm.value.comment).subscribe(
      data => {
        this.success = true;
        this.error = false;
        this.successMessage = "Comment posted successfully"
      },
      err => {
        this.error = true;
        this.errorList = err;
      });
  }

}
