import { Component, OnInit, Input } from '@angular/core';
import {ProfileService} from '../../services/userservices/profile.service'
import { Profile } from 'src/app/model/Profile';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username;
  profile : Array<Profile>;
  showMyArticles;
  Navbarlinks = [
    { path: 'myarticles', label: 'My Articles' },
    { path: 'favouritearticles', label: 'Favourited Articles' }];
// @Input() username;

    constructor(private profileService : ProfileService) { }

  ngOnInit(): void {
    this.profileService.getUser().subscribe(
      data => { 
      this.username=data.user.username;
      this.showMyArticles = true;
    this.profileService.getProfiles(this.username).subscribe(
      data => { console.log(data.profile.username)
      this.profile=data.profiles;
        
      this.showMyArticles = true;
      },
      err => {
      //console.log(err)
      });
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
