import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  constructor(private router: Router) { 
    console.log(this.router.getCurrentNavigation().extras.state)
  }

  ngOnInit(): void {
  }

}
