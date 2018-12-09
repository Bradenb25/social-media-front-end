import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  
  private friendsForUserUrl: string;
  private deleteFriendUrl: string;
  private friendRequestUrl: string;
  private friendRequestsUrl: string;
  private addFriendUrl: string;
  private deleteFriendRequestUrl: string;

  constructor(private _http: HttpClient) {
    this.friendsForUserUrl = `/friends `; 
    this.deleteFriendUrl = `/friends?id=`
    this.friendRequestUrl = `/friend/request`;
    this.friendRequestsUrl = `/friend/request`;
    this.addFriendUrl = `/friend`
    this.deleteFriendRequestUrl = `/friend/request?id=`;
  }

  deleteFriendRequest(id: number) {
    return this._http.delete(this.deleteFriendRequestUrl + id);
  }

  getFriendsForUser() {
    return this._http.get(this.friendsForUserUrl);
  }

  deleteFriend(personId: number) {
    return this._http.delete(this.deleteFriendUrl + personId);
  }

  createFriendRequest(id: number) {
    return this._http.post(this.friendRequestUrl, {userId: id});
  }

  getFriendRequests() {
    return this._http.get<any>(this.friendRequestsUrl);
  }

  addFriend(id: number) {
    return this._http.post<any>(this.addFriendUrl, {friendId: id})
  }

}
