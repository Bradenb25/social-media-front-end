import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../shared/models/post';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPictureComponent } from '../add-picture/add-picture.component';
import { GroupService } from '../services/group.service';
import { Group } from '../shared/models/group';
import { GroupInfo } from '../shared/models/group-info';
import { DomSanitizer } from '@angular/platform-browser';
import { PictureService } from '../services/picture.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private postSvc: PostService,
    private userSvc: UserService,
    private dialog: MatDialog,
    private groupSvc: GroupService,
    private _sanitizer: DomSanitizer,
    private picSvc: PictureService) { }

  posts: Post[];
  groupId: number;
  groupInfo: GroupInfo;
  groupPicture: any;
  showAbout: boolean = false;
  showDiscussion: boolean = true;
  showMembers: boolean = false;
  groupMembers: any;
  showJoinGroup: boolean;

  ngOnInit() {
    this.groupInfo = new GroupInfo();
    this.groupId = +this.route.snapshot.paramMap.get('id');
    this.showJoinGroup = true;

    this.postSvc.getPosts(this.groupId)
      .subscribe(x => {
        // console.log(x); 
        for (let i = 0; i < x.length; i++) {
          x[i].pictureUrl = '';
        }
        this.posts = x;
      })

    this.groupSvc.getGroupInfo(this.groupId)
      .subscribe(x => {
        this.groupInfo = x[0];
        if (this.groupInfo.picture) {
          var getImageResult = this.groupInfo.picture;
          var binstr = Array.prototype.map.call(getImageResult.data, function (ch) {
            return String.fromCharCode(ch);
          }).join('');
          let data = btoa(binstr);
          let picture = "data:image/jpg;base64," + data;
          this.groupPicture = this._sanitizer.bypassSecurityTrustUrl(picture);
        } else {
          this.groupPicture = 'https://via.placeholder.com/700x300?text=Add+Group+Picture+Here';
        }

      });

    this.getGroupMembers();
  }

  changePicture() {
    const dialogRef = this.dialog.open(AddPictureComponent, {
      width: '650px',
      data: {
        showGroup: true,
        groupId: this.groupId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status == 'success') {
        setTimeout(y => {
          this.groupSvc.getGroupPhoto(this.groupId)
            .subscribe(x => {
              this.groupPicture = this.picSvc.getPictureFromBuffer(x.picture);
            })
        }, 1000);
      } else if (result.status == 'failed') {

      }
    })
  }

  newMessage(post: Post) {
    this.posts.unshift(post);
  }

  deletePost(post: Post) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);
  }

  about() {
    this.showAbout = true;
    this.showDiscussion = false;
    this.showMembers = false;
  }

  discussion() {
    this.showAbout = false;
    this.showDiscussion = true;
    this.showMembers = false;
  }

  getGroupMembers() {
    this.groupSvc.getUsersForGroup(this.groupId)
      .subscribe(x => {
        this.groupMembers = x;

        this.showJoinGroup = true;

        for (let i = 0; i < x.length; i++) {
          if (this.userSvc.getSecurityObject().userName == x[i].username) {
            this.showJoinGroup = false;
          }
        }
      });
  }

  leaveGroup() {
    this.groupSvc.removeSignedInFromGroup(this.groupId)
      .subscribe(x => {
        this.getGroupMembers();
      })
  }

  members() {
    this.showAbout = false;
    this.showDiscussion = false;
    this.showMembers = true;
    if (!this.groupMembers) {
      this.getGroupMembers();
    }
  }

  joinGroup() {
    this.groupSvc.joinGroup(this.groupId, this.userSvc.getSecurityObject().id)
      .subscribe(x => {
        this.getGroupMembers();
      });
  }

}
