import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  Navbarlinks = [
    { path: 'yourfeed', label: 'My Articles' },
    { path: 'globalfeed', label: 'Favourited Articles' }];
  constructor() { }

  ngOnInit(): void {
  }

}
