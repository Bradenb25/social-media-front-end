import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PostComment } from 'src/app/shared/models/post-comment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {

  constructor(private userSvc: UserService) { }

  @Input() postComment: PostComment;
  @Output() event = new EventEmitter<string>();

  ngOnInit() {
    console.log(this.postComment);
    this.postComment.pictureUrl = this.userSvc.getProfilePicUrl(this.postComment.username);
  }

  deleteComment() {
    this.event.emit('delete');
  }

}
