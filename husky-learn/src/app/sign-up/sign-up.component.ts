import { Component, OnInit } from '@angular/core';
import {FormControl, Validators,FormGroup} from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  hide = true;
  signupForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor() {
    
   }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email:  this.email,
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  onSubmit(){
    console.log("logged")
  }
}
