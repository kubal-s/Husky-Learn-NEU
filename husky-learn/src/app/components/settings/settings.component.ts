import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authservices/auth.service';
import { ProfileService } from '../../services/userservices/profile.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userservices/user.service';

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

  constructor( private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private authService:AuthService) { 
      this.settingsForm = this.fb.group({
        image: '',
        username: '',
        bio: '',
        email: '',
        password: ''
      });
      // Optional: subscribe to changes on the form
      // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
    }
    
  ngOnInit(): void {
    // Make a fresh copy of the current user's object to place in editable form fields
    Object.assign(this.user, this.userService.getCurrentUser());
    // Fill the form
    this.settingsForm.patchValue(this.user);
  }

  logout() {
    this.authService.logout();
  }



  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}