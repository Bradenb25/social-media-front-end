import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FriendsService } from '../services/friends.service';
import { PictureService } from '../services/picture.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupComponent } from '../group/create-group/create-group.component';

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
    private dialog: MatDialog) { }

  friendRequests: any;
  name: string;


  ngOnInit() {
    this.friendSvc.getFriendRequests()
      .subscribe(y => {
        for (let i = 0; i < y.length; i++) {
          y[i].pictureUrl = this.getProfilePictureUrl(y[i].username);
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
