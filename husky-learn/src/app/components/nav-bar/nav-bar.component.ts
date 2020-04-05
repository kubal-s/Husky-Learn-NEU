import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/authservices/auth.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  
  isLoggedIn$: Observable<boolean>;  

  Navbarlinks = [
    { path: 'home', label: 'Home' },
    { path: 'signin', label: 'Sign in' },
    { path: 'signup', label: 'Sign up' }];

    LoggedInNavbarlinks = [
      { path: 'home', label: 'Home' },
      { path: 'myarticle', label: 'New Article' },
      { path: 'settings', label: 'Settings' }];
      links;

  constructor(private authService: AuthService) {
    this.links = this.Navbarlinks;
   }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

}