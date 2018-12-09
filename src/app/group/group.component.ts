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
    private _sanitizer: DomSanitizer) { }

  posts: Post[];
  groupId: number;
  groupInfo: GroupInfo;
  groupPicture: any;
  showAbout: boolean = false;
  showDiscussion: boolean = true;
  showMembers: boolean = false;
  groupMembers: any;

  ngOnInit() {
    this.groupInfo = new GroupInfo();
    this.groupId = +this.route.snapshot.paramMap.get('id');

    this.postSvc.getPosts(this.groupId)
      .subscribe(x => {
        // console.log(x); 
        for (let i = 0; i < x.length; i++) {
          x[i].pictureUrl = this.userSvc.getProfilePicUrl(x[i].username);
        }
        this.posts = x;
      })

    this.groupSvc.getGroupInfo(this.groupId)
      .subscribe(x => {
        console.log('Group info:')
        console.log(x);
        this.groupInfo = x[0];
        console.log(this.groupInfo);

        var getImageResult = this.groupInfo.picture;
        var binstr = Array.prototype.map.call(getImageResult.data, function (ch) {
          return String.fromCharCode(ch);
        }).join('');
        let data = btoa(binstr);
        let picture = "data:image/jpg;base64," + data;
        this.groupPicture = this._sanitizer.bypassSecurityTrustUrl(picture);

      });
  }

  changePicture() {
    const dialogRef = this.dialog.open(AddPictureComponent, {
      width: '650px',
      data: {
        showGroup: true,
        groupId: this.groupId
      }
    });
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

  members() {
    this.showAbout = false;
    this.showDiscussion = false;
    this.showMembers = true;
    if (!this.groupMembers) {
      this.groupSvc.getUsersForGroup(this.groupId)
        .subscribe(x => {
          this.groupMembers = x;
        });
    }
  }

  joinGroup() {
    this.groupSvc.joinGroup(this.groupId, this.userSvc.getSecurityObject().id) 
      .subscribe(x => {

      });
  }
}
