import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GroupType } from '../shared/models/group-type';
import { Group } from '../shared/models/group';
import { GroupInfo } from '../shared/models/group-info';

@Injectable({
  providedIn: 'root'
})
export class GroupService {


  private groupSearchUrl: string;
  private groupTypesUrl: string;
  private createGroupUrl: string;
  private groupInfoUrl: string;
  private changeGroupPhotoUrl: string;
  private pictureUrl: string;
  private usersForGroupUrl: string;
  private joinGroupUrl: string;
  private groupsUsersAreInUrl: string;
  private addPersonToGroup: string;
  private groupPicUrl: string;
  private removedSignedInFromGroupUrl: string;

  constructor(private _http: HttpClient) {
    this.groupSearchUrl = `/group/search?name=`; 
    this.groupTypesUrl = `/group/types`;
    this.createGroupUrl = `/group`;
    this.groupInfoUrl = `/group?groupId=`;
    this.changeGroupPhotoUrl = `/group/pic?groupId=`;
    this.pictureUrl = `/group/pic?groupId=`;
    this.usersForGroupUrl = `/group/users?id=`;
    this.joinGroupUrl = `/group/user`;
    this.groupsUsersAreInUrl = `/user/groups`;
    this.groupPicUrl = `/group/pic?groupId=`;
    this.removedSignedInFromGroupUrl = `/group/user?groupId=`;
  }

  getGroupPhoto(groupId: number) {
    return this._http.get<any>(this.groupPicUrl + groupId);
  }

  createGroup(group: Group) {
    return this._http.post<any>(this.createGroupUrl, group);
  }

  getGroups(query: string) {
    return this._http.get(this.groupSearchUrl + query);
  }

  getGroupTypes() {
    return this._http.get<GroupType[]>(this.groupTypesUrl);
  }

  getGroupInfo(groupId: number) {
    return this._http.get<GroupInfo[]>(this.groupInfoUrl + groupId);
  }

  changePhoto(file: File, groupId: number) {    
    const formData: FormData = new FormData();
    formData.append('fileKey', file, file.name);
    return this._http.post(this.changeGroupPhotoUrl + groupId, formData);
  }

  getGroupThumnail(id: number) {
    return this._http.get<any>(this.pictureUrl + id);
  }

  getUsersForGroup(id: number) {
    return this._http.get<any>(this.usersForGroupUrl + id);
  }

  joinGroup(groupId: number, personId: number) {
    return this._http.post(this.joinGroupUrl, {id: groupId, personId: personId});
  }

  removeSignedInFromGroup(groupId: number) {
    return this._http.delete(this.removedSignedInFromGroupUrl + groupId);
  }
}
