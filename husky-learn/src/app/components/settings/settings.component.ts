import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authservices/auth.service';
import { ProfileService } from '../../services/userservices/profile.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: any;
  error=false;
  errorList;
  currentUser: any;
  username=null;

  constructor(private authService:AuthService, private route: ActivatedRoute,private  profileService: ProfileService, private router: Router) { 
    this.username=null; 
  }
    
    
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.username = params.get('username')
        this.currentUser = history.state;
  
        });
        if(this.currentUser != null){
          this.settingsForm = new FormGroup({
            image: new FormControl(this.currentUser.image),
            username:  new FormControl(this.currentUser.username),
            bio: new FormControl(this.currentUser.bio),
            email: new FormControl(this.currentUser.email),
            password:new FormControl(this.currentUser.password)
  
          });
        }
        else{
          this.settingsForm = new FormGroup({
            image: new FormControl(""),
            username:  new FormControl(""),
            bio: new FormControl(""),
            email: new FormControl(""),
            password:new FormControl("")
  
          
        })
        }
      }
      onSubmit(){
        
        if(this.username!= null){
          this.profileService.updateUser(this.username,this.settingsForm.value).subscribe(
            data => {
                
                //this.router.navigate(['/editor'],{state : data});
            },
            err => {
              this.errorList = err;
              this.error = true;
            });
        }
        else{
          this.profileService.updateUser(this.username,this.settingsForm.value).subscribe(
            data => {
                
                this.router.navigate(['/home'],{state : data});
            },
            err => {
              this.errorList = err;
              this.error = true;
            });
        }
    
      }
    
    
    

  logout() {
    this.authService.logout();
  }




}