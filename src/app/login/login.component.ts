import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router,
    private dialog: MatDialog) { }

  userName: FormControl;
  password: FormControl;
  loginGroup: any;
  error: boolean;

  ngOnInit() {
    this.userName = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.loginGroup = new FormGroup({
      userName: this.userName,
      password: this.password
    })
  }

  login() {
    let appUser = new User();
    appUser.userName = this.userName.value;
    appUser.password = this.password.value;
    this.userService.login(appUser)
      .subscribe(x => {
        this.userService.setSecurityObject(x);
        this.router.navigate(['/user']);
      });

  } 

  // renewBearerToken(tokenTime: Date, appUserAuth: AppUserAuth) {
  //   let tokenMil = tokenTime.getTime();
  //   let curMil = (new Date()).getTime();
  //   let renewMil = tokenMil - curMil - 60000;
  //   setTimeout(() => {
  //     let authRenewelRequest = new AuthRenewelRequest();
  //     authRenewelRequest.clientSecret = "";
  //     let dialogRef = this.dialog.open(RenewBearerTokenComponent, {
  //       width: '550px',
  //       height: '200px',
  //       data: {
  //         renewelRequest: authRenewelRequest
  //       }
  //     });
  //   }, renewMil);
  // }

}
