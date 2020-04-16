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
showMyArticles;
    constructor(private profileService : ProfileService) { }

  ngOnInit(): void {

    this.profileService.getUser().subscribe(
      data => { 
      this.username=data.user.username;
        
      this.showMyArticles = true;
      },
      err => {
      //console.log(err)
      });
      }
      decideArticleTab(num){
        if(num==1)
          this.showMyArticles = true;
        else if(num==2)
          this.showMyArticles = false;
      }
}
