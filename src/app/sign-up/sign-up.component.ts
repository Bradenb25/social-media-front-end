import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private userSvc: UserService,
              private _router: Router) { }
    
  userName: FormControl;
  password: FormControl;
  email: FormControl;
  firstName: FormControl;
  loginGroup: any;

  userNameExists: boolean = false;

  ngOnInit() {
    this.userName = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);
    this.firstName = new FormControl('', Validators.required);
    this.loginGroup = new FormGroup({
      user_name: this.userName,
      hashed_password: this.password,
      email: this.email,
      first_name: this.firstName
    })
  }

  signUp() {
    let userUpdateDto = new User();
    userUpdateDto.email = this.email.value;
    userUpdateDto.firstName = this.firstName.value;
    userUpdateDto.password = this.password.value; 
    userUpdateDto.userName = this.userName.value;
    this.userSvc.signUp(userUpdateDto)
      .subscribe(x => {
        this.userSvc.setSecurityObject(x);
        this._router.navigate(['/user']);
      });
  }

  userExists() {
    // let username = this.userName.value; 
    // this._securityService.userExist(username)
    //   .subscribe(x => {
    //     this.userNameExists = x.exists;
    //   });
  }
}
