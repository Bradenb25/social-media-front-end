import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GroupType } from '../shared/models/group-type';
import { Group } from '../shared/models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {


  private groupSearchUrl: string;
  private groupTypesUrl: string;
  private createGroupUrl: string;
  private groupInfoUrl: string;

  constructor(private _http: HttpClient) {
    this.groupSearchUrl = `/group/search?name=`; 
    this.groupTypesUrl = `/group/types`;
    this.createGroupUrl = `/group`;
    this.groupInfoUrl = `/group`;
  }

  createGroup(group: Group) {
    return this._http.post(this.createGroupUrl, group);
  }

  getGroups(query: string) {
    return this._http.get(this.groupSearchUrl + query);
  }

  getGroupTypes() {
    return this._http.get<GroupType[]>(this.groupTypesUrl);
  }

  getGroupInfo() {
    return this._http.get(this.groupInfoUrl);
  }

}
