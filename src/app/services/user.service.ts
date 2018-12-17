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
  private profilePicDataUrl: string;
  private groupsUsersAreInUrl: string;
  private searchUrl: string;

  constructor(private _http: HttpClient) {
    this.createUserUrl = `/user`;
    this.loginUrl = `/login`;
    this.profilePicDataUrl = `/user/profile-pic?username=`;
    this.groupsUsersAreInUrl = `/user/groups`;    
    this.searchUrl = `/user/search?name=`; 
  }

  getGroupsForUser() { 
    return this._http.get<any>(this.groupsUsersAreInUrl);
  }

  searchForUsers(query: string) {
    return this._http.get<any>(this.searchUrl + query);
  }

  getSecurityObject() {
    return this.securityObject;
  }

  uploadProfilePic(file: File) {
      const formData: FormData = new FormData();
      formData.append('fileKey', file, file.name);
      return this._http
        .post(this.profilePicDataUrl, formData);
  }

  getLoggedInProfilePicUrl() {
    return environment.baseUrl + '/user/profile-pic?username=' + this.securityObject.userName;
  }

  getProfilePicUrl(username: string) {
    return environment.baseUrl + '/user/profile-pic?username=' + username;
  }

  getProfilePicData(username: string = this.securityObject.userName) {
    return this._http.get<any>(this.profilePicDataUrl + username);
  }

  signUp(user: User) {
    return this._http.post<any>(this.createUserUrl, user);
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
 