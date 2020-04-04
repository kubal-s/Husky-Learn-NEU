import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from "../authservices/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hide = true;
  signinForm: FormGroup;
  error = false;
  errorList;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private authService: AuthService,private router: Router) {
    
   }

  ngOnInit(): void {
    // if(this.authService.isLogged()==true){
    //   this.router.navigate(['/home']);
    // }
    this.authService.setLogout();
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
    this.error = false;
    this.authService.signIn(this.signinForm.value).subscribe(
      data => {
        console.log(data)
        this.authService.setAuthToken(data);
        this.router.navigate(['/home']);
      },
      err => {
        this.errorList = err;
        this.error = true;
      });
  }
}
