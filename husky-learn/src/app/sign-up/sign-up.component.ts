import { Component, OnInit } from '@angular/core';
import { FormControl, Validators,FormGroup } from '@angular/forms';
import { AuthService } from "../services/auth.service";
// import { Errors } from '../model/Error';
import { error } from '../config/errorList';
import { Errors } from '../model/Error';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  hide = true;
  signupForm: FormGroup;
  error = false;
  errorMsg = "";
  // errors: Errors = new Errors();
  email = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('',[Validators.required, Validators.minLength(6)])

  constructor(private authService: AuthService) {
    
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
    this.error = false;
    // this.errors = new Errors();
    this.authService.signUp(this.signupForm.value).subscribe(
      data => {
        console.log(data);
      },
      err => {
        this.error = true;
        this.errorMsg = error.emailTaken;
      });
  }
}
