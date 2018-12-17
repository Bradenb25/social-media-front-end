import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../services/friends.service';
import { PictureService } from '../services/picture.service';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AddPictureUserComponent } from './add-picture-user/add-picture-user.component';
import { DomSanitizer } from '@angular/platform-browser';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private friendsService: FriendsService,
    private pictureService: PictureService,
    private userSvc: UserService,
    private matDialog: MatDialog,
    private _sanitizer: DomSanitizer,
    private grpSvc: GroupService) { }

  friends: any;
  fileToUpload: File = new File([new Blob], '', new Object());
  profilePicture: any;
  user: any;
  groups: any;
  isMouseInPicture = false;
  isMouseOnCamera = true;
  groupResults: any;

  ngOnInit() {
    this.getFriendsForUser();
    this.user = this.userSvc.getSecurityObject();

    this.getProfilePicData();

    this.userSvc.getGroupsForUser()
      .subscribe(x => {
        this.groupResults = x.groups;
      });
  }


  getProfilePicData() {
    this.userSvc.getProfilePicData()
      .subscribe(x => {
        if (x.picture != null) {
          var getImageResult = x.picture;
          var binstr = Array.prototype.map.call(getImageResult.data, function (ch) {
            return String.fromCharCode(ch);
          }).join('');
          let data = btoa(binstr);
          let picture = "data:image/jpg;base64," + data;
          this.profilePicture = this._sanitizer.bypassSecurityTrustUrl(picture);
        } else {
          this.getDefaultPicture();
        }
      });
  }

  getDefaultPicture() {
    this.profilePicture = environment.baseUrl + '/api/user/profile-pic/default';
  }

  getFriendsForUser() {
    this.friendsService.getFriendsForUser()
      .subscribe(x => {
        this.friends = x;
      })
  }

  getProfilePictureUrl(username: string) {
    return environment.baseUrl + '/user/profile-pic?username=' + username;
  }

  openCropper() {
    const dialogRef = this.matDialog.open(AddPictureUserComponent, {
      width: '650px',
      data: {
        showGroup: true,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status = 'success') {
        setTimeout(x => {
          this.getProfilePicData();
        }, 1000);
      }
    })
  }

  friendDeleted() {
    this.getFriendsForUser();
  }

  mouseEvent(event) {
    if (event.toElement.id == 'users-picture' || event.toElement.id == 'add-pic-holder') {
      this.isMouseInPicture = true;
    } else {
      this.isMouseInPicture = false;
    }
  }
}
