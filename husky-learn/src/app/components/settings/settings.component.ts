import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authservices/auth.service';
import { ProfileService } from '../../services/userservices/profile.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
username="";
email="";
  constructor( private router: Router,
  
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService) { 
      this.settingsForm = this.fb.group({
        image: '',
        username: this.username,
        bio: '',
        email: this.email,
        password: ''
      });
      // Optional: subscribe to changes on the form
      // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
    }
    
    ngOnInit(): void {
      this.profileService.getUser().subscribe(
      data => {
      this.username=data.user.username;
      this.email=data.user.email;
      
      },
      err => {
      //console.log(err)
      });
      }

  logout() {
    this.authService.logout();
  }




}