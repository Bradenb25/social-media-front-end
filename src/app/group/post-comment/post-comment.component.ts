import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PostComment } from 'src/app/shared/models/post-comment';
import { UserService } from 'src/app/services/user.service';
import { PictureService } from 'src/app/services/picture.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {

  constructor(private userSvc: UserService,
      private picSvc: PictureService) { }

  @Input() postComment: PostComment;
  @Output() event = new EventEmitter<string>();

  ngOnInit() {
    this.picSvc.getPicture(this.postComment.username)
      .subscribe(x => {
        this.postComment.pictureUrl = this.picSvc.getPictureFromBuffer(x.picture);
      });
  }

  deleteComment() {
    this.event.emit('delete');
  }

}
