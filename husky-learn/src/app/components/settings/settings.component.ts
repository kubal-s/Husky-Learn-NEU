import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authservices/auth.service';
import { ProfileService } from '../../services/userservices/profile.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private authService:AuthService,private profileService:ProfileService) { }

  ngOnInit(): void {
    this.profileService.getUser().subscribe(
      data => {
        //console.log(data)
      },
      err => {
        //console.log(err)
      });
  }
  logOut(){
    this.authService.logout();
  }
}
