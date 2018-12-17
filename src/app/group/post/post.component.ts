import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/services/post.service';
import { PostComment } from 'src/app/shared/models/post-comment';
import { UserService } from 'src/app/services/user.service';
import { SecurityObject } from 'src/app/shared/models/security-object';
import { PictureService } from 'src/app/services/picture.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private postSvc: PostService,
    private userSvc: UserService,
    private picSvc: PictureService) { }

  @Input() post: Post;
  @Output() postDeleted: EventEmitter<Post> = new EventEmitter();
  postComments: PostComment[];
  loggedInUser: SecurityObject = this.userSvc.getSecurityObject();
  replyPicUrl: any;

  ngOnInit() {
    this.picSvc.getPicture(this.post.username)
      .subscribe(x => {
        this.post.pictureUrl = this.picSvc.getPictureFromBuffer(x.picture);
      });

    this.picSvc.getPicture()
      .subscribe(x => {
        this.replyPicUrl = this.picSvc.getPictureFromBuffer(x.picture);
      });

    console.log(this.post);
    this.postSvc.getCommentsForPost(this.post.id)
      .subscribe(x => {
        // console.log("post comments are " + JSON.stringify(x));
        for (let i = 0; i < x.length; i++) {
          x[i].showDeleteButton = (x[i].username.toLowerCase() == this.loggedInUser.userName.toLowerCase());
        }
        this.postComments = x;
      })
  }

  createComment(content, event) {
    if (event.key == 'Enter') {
      let postComment = new PostComment();
      postComment.content = content.value;
      postComment.post_id = this.post.id;
      postComment.time = new Date();
      postComment.username = this.loggedInUser.userName;
      postComment.name = this.loggedInUser.name;
      this.postSvc.createComment(postComment)
        .subscribe(x => {
          postComment.post_comment_id = x;
          postComment.showDeleteButton = true;
          this.postComments.push(postComment);
          content.value = '';
        })
    }
  }

  deletePostComment(postComment: PostComment) {
    if (postComment.username.toLowerCase() == this.loggedInUser.userName.toLowerCase()) {
      this.postSvc.deletePostComment(postComment.post_comment_id)
        .subscribe(x => {
          let indexOfComment = this.postComments.indexOf(postComment)
          this.postComments.splice(indexOfComment, 1);
        });
    }
  }

  deletePost(post: Post) {
    this.postSvc.deletePost(post.id)
      .subscribe(x => {
        this.postDeleted.emit(post);
      })
  }

} 
