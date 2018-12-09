import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FriendsService } from '../services/friends.service';
import { PictureService } from '../services/picture.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupComponent } from '../group/create-group/create-group.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // appUserAuth: AppUserAuth;

  constructor(private userService: UserService,
    private router: Router,
    private friendSvc: FriendsService,
    private picSvc: PictureService,
    private dialog: MatDialog,
    private usrSvc: UserService,
    private _sanitizer: DomSanitizer) { }

  friendRequests: any[];
  name: string;


  ngOnInit() {
    this.friendSvc.getFriendRequests()
      .subscribe(y => {
        for (let i = 0; i < y.length; i++) {

          this.usrSvc.getProfilePicData(y[i].username)
            .subscribe(x => {
              var getImageResult = x.picture;
              var binstr = Array.prototype.map.call(getImageResult.data, function (ch) {
                return String.fromCharCode(ch);
              }).join('');
              let data = btoa(binstr);
              let picture = "data:image/jpg;base64," + data;
              y[i].pictureUrl = this._sanitizer.bypassSecurityTrustUrl(picture);
            });

          if (i + 1 == y.length) {

            this.friendRequests = y;
          }
        }
      });

    this.name = this.userService.getSecurityObject().name;
  }

  getProfilePictureUrl(picture) {
    return environment.baseUrl + '/user/profile-pic?username=' + picture;
  }

  addFriend(request) {
    this.friendSvc.addFriend(request.id)
      .subscribe(x => {
        this.friendSvc.deleteFriendRequest(request.id)
          .subscribe(x => {
            let index = this.friendRequests.indexOf(request);
            this.friendRequests.splice(index, 1);
          })
      });
  }

  isAuthenticated() {
    return this.userService.isAuthenticated();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  search(query, event) {
    if (event.key == 'Enter') {
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([`/search`, { query: query.value }]);
    }
  }

  createGroup() {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '500px',
    });
  }

}
