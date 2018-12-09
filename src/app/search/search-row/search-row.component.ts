import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FriendsService } from 'src/app/services/friends.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-search-row',
  templateUrl: './search-row.component.html',
  styleUrls: ['./search-row.component.css']
})
export class SearchRowComponent implements OnInit {

  constructor(private http: HttpClient,
    private friendService: FriendsService,
    private router: Router,
    private userSvc: UserService,
    private _sanitizer: DomSanitizer,
    private grpSvc: GroupService) { }

  @Input() result: any;
  @Input() showDelete: boolean;
  @Input() showAdd: boolean;
  @Input() isGroup: boolean;

  ngOnInit() {
    if (this.isGroup) {
      this.getGroupUrl();
      this.getGroupPictureUrl();
    } else {
      this.getProfilePictureUrl();
    }
  }

  pictureUrl: any;

  getGroupUrl() {
    this.result.url = '/group/' + this.result.id;
  }

  navigate() {
    this.router.navigate([`${this.result.url}`]);
  }

  getGroupPictureUrl() {
    this.grpSvc.getGroupThumnail(this.result.id)
      .subscribe(x => {
        var getImageResult = x.picture;
        var binstr = Array.prototype.map.call(getImageResult.data, function (ch) {
          return String.fromCharCode(ch);
        }).join('');
        let data = btoa(binstr);
        let picture = "data:image/jpg;base64," + data;
        this.pictureUrl = this._sanitizer.bypassSecurityTrustUrl(picture);
      })
  }

  getProfilePictureUrl() {

    this.userSvc.getProfilePicData(this.result.username)
      .subscribe(x => {
        var getImageResult = x.picture;
        var binstr = Array.prototype.map.call(getImageResult.data, function (ch) {
          return String.fromCharCode(ch);
        }).join('');
        let data = btoa(binstr);
        let picture = "data:image/jpg;base64," + data;
        this.pictureUrl = this._sanitizer.bypassSecurityTrustUrl(picture);
      });
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
