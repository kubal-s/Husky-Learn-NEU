import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hide = true;
  signinForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private authService: AuthService) {
    
   }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
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
    this.authService.signIn(this.signinForm.value);
    console.log("logged")
  }
}
