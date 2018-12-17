import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {

  constructor(private usrService: UserService,
    private router: Router) { }

  canActivate(): boolean {
    if (this.usrService.getSecurityObject()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }  
}

@Injectable()
export class LoginAuthService implements CanActivate {

  constructor(private usrService: UserService,
    private router: Router) { }

  canActivate(): boolean {
    if (!this.usrService.getSecurityObject()) {    
      return true;
    } else {        
      this.router.navigate(['/user']);
      return true;
    }
  }  
}