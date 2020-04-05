import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authservices/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  logOut(){
    this.authService.logout();
  }
}
