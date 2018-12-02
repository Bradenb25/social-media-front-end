import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FriendsService } from 'src/app/services/friends.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-row',
  templateUrl: './search-row.component.html',
  styleUrls: ['./search-row.component.css']
})
export class SearchRowComponent implements OnInit {

  constructor(private http: HttpClient,
    private friendService: FriendsService,
    private router: Router) { }

  @Input() result: any;
  @Input() showDelete: boolean;
  @Input() showAdd: boolean;
  @Input() isGroup: boolean;

  ngOnInit() {
    this.getProfilePictureUrl();
    if (this.isGroup) {
      this.getGroupUrl();
    }
  }

  pictureUrl: string;

  getGroupUrl() {
    this.result.url = '/group/' + this.result.id;
  }

  navigate() {
    this.router.navigate([`${this.result.url}`]);
  }

  getProfilePictureUrl() {
    this.pictureUrl = environment.baseUrl + '/user/profile-pic?username=' + this.result.username;
  }

  unFriend() {
    this.friendService.deleteFriend(this.result.id)
      .subscribe(x => {

      })
  }

  friendRequest() {
    this.friendService.createFriendRequest(this.result.id)
      .subscribe(x => {

      });
  }



}
