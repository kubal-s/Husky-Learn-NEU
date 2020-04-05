import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Navbarlinks = [
    { path: 'yourfeed', label: 'Your Feed' },
    { path: 'globalfeed', label: 'Global Feed' }];
  constructor() { }

  ngOnInit(): void {
  }

}
