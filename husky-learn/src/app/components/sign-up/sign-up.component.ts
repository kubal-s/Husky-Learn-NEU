import { Component, OnInit } from '@angular/core';
import { FormControl, Validators,FormGroup } from '@angular/forms';
import { AuthService } from "../../services/authservices/auth.service";
// import { Errors } from '../model/Error';
import { Errors } from '../../model/Error';
import { Router } from '@angular/router';
import { JwtService } from "../../sharedservices/jwtToken";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  hide = true;
  signupForm: FormGroup;
  error = false;
  errorList ;
  // errorMsg :Array<String> =[];
  // errors: Errors = new Errors();
  email = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('',[Validators.required, Validators.minLength(6)])

  constructor(private authService: AuthService,private router: Router,private jwtService:JwtService) {
    
   }

  ngOnInit(): void {
    // if(this.authService.isLogged()==true){
    //   this.router.navigate(['/home']);
    // }
    // this.authService.logout();
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
    this.authService.signUp(this.signupForm.value).subscribe(
      data => {
        this.authService.signIn(this.signupForm.value).subscribe(
          data => {
            // this.jwtService.saveToken(data);
            this.router.navigate(['/home']);
          },
          err => {
            this.errorList = err;
            this.error = true;
          });
        this.signupForm.reset();
      },
      err => {
        this.errorList = err;
        this.error = true;
      });
  }
}
