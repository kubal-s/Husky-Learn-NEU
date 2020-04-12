import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../services/userservices/profile.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  Navbarlinks = [
    { path: 'myarticles', label: 'My Articles' },
    { path: 'favouritearticles', label: 'Favourited Articles' }];
username;

    constructor(private profileService : ProfileService) { }

  ngOnInit(): void {

    this.profileService.getUser().subscribe(
      data => { 
      this.username=data.user.username;
    
      },
      err => {
      //console.log(err)
      });
      }

}
