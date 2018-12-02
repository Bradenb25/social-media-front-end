import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/shared/models/post';
import { PostComment } from 'src/app/shared/models/post-comment';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { SecurityObject } from 'src/app/shared/models/security-object';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  constructor(private postSvc: PostService,
              private userSvc: UserService) { }

  message: string;
  pictureUrl: string;
  loggedInUser: SecurityObject;
  @Input() groupId: number;

  ngOnInit() {
    this.message = '';
    this.pictureUrl = this.userSvc.getLoggedInProfilePicUrl();
    this.loggedInUser = this.userSvc.getSecurityObject();
  }

  createPost() {
      console.log(this.message);
      let post = new Post();
      post.time = new Date();
      post.group_id = this.groupId;
      post.content = this.message;
      post.username = this.loggedInUser.userName;
      post.id = 0;
      post.poster = '';
      post.poster_id = 0;
      post.poster_name = this.loggedInUser.name;
      this.postSvc.createPost(post)
        .subscribe(x => {
          console.log('The new post id is ' + x);
        })
  }

}
