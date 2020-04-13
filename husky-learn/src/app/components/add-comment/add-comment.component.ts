import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArticleService } from '../../services/userservices/article.service'
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
  @Output() updateCommentList = new EventEmitter<any>();
  constructor(private articleService: ArticleService) {
    this.success = false;
    this.error = false;
  }

  ngOnInit(): void {
    this.addCommentForm = new FormGroup({
      comment: new FormControl('')
    })
  }

  onSubmit() {
    this.articleService.postComment(this.slug, this.addCommentForm.value.comment).subscribe(
      data => {
        this.success = true;
        this.error = false;
        this.updateCommentList.emit();
        this.successMessage = "Comment posted successfully"
      },
      err => {
        this.error = true;
        this.errorList = err;
      });
  }

}
