import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecurityObject } from '../shared/models/security-object';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private createUserUrl: string;
  private loginUrl: string;
  private securityObject: SecurityObject;
  private profilePicUrl: string;

  constructor(private _http: HttpClient) {
    this.createUserUrl = `/user`;
    this.loginUrl = `/login`;
    this.profilePicUrl = `/user/profile-pic`;
  }

  getSecurityObject() {
    return this.securityObject;
  }

  getLoggedInProfilePicUrl() {
    return environment.baseUrl + '/user/profile-pic?username=' + this.securityObject.userName;
  }

  getProfilePicUrl(username: string) {
    return environment.baseUrl + '/user/profile-pic?username=' + username;
  }

  signUp(user: User) {
    return this._http.post(this.createUserUrl, user);
  }

  login(user: User): Observable<any> {
    return this._http.post(this.loginUrl, user);
  }

  setSecurityObject(security: SecurityObject) {
    localStorage.setItem('bearer', JSON.stringify(security));
    this.securityObject = security;
  }

  isAuthenticated() {
    if (!this.securityObject) {
      return false;
    } else {
      return this.securityObject.isAuthenticated;
    }
  }

  logout() {
    this.securityObject = null;
    localStorage.removeItem('bearer');
  }
}
 