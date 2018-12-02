import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../shared/models/post';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPictureComponent } from '../add-picture/add-picture.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private postSvc: PostService,
    private userSvc: UserService,
    private dialog: MatDialog) { }

  posts: Post[];
  groupId: number;

  ngOnInit() {
    this.groupId = +this.route.snapshot.paramMap.get('id');



    this.postSvc.getPosts(this.groupId)
      .subscribe(x => {
        // console.log(x);
        for (let i = 0; i < x.length; i++) {
          x[i].pictureUrl = this.userSvc.getProfilePicUrl(x[i].username);
        }
        this.posts = x;
      })
  }

  changePicture() {
    const dialogRef = this.dialog.open(AddPictureComponent, {
      width: '650px',
      data: { 
        showGroup: true
      }
    });
  }

}
