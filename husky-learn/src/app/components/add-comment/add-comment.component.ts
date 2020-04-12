import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  addCommentForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.addCommentForm = new FormGroup({
      comment: new FormControl('')
    })
  }

  onSubmit(){
    console.log("submitted");
  }

}
