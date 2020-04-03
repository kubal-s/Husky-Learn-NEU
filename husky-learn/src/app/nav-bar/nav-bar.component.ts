import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  links = [
    { path: 'home', label: 'Home' },
    { path: 'signin', label: 'Sign in' },
    { path: 'signup', label: 'Sign up' }];
  // activeLink = this.links[0];
  constructor() { }

  ngOnInit(): void {
  }

}
