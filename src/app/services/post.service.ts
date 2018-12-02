import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../shared/models/post';
import { PostComment } from '../shared/models/post-comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private postUrl: string;
  private postCommentsUrl: string;
  private createPostCommentUrl: string;
  private deletePostCommentUrl: string;
  private createPostUrl: string;

  constructor(private _http: HttpClient) {
    this.postUrl = `/post?groupid=`; 
    this.postCommentsUrl = `/post/comment?postId=`;
    this.createPostCommentUrl = `/post/comment`;
    this.deletePostCommentUrl = `/post/comment?id=`;
    this.createPostCommentUrl = `/post`;
    this.createPostUrl = `/post`;
  }

  createPost(post: Post) {
    return this._http.post(this.createPostUrl, post);
  }

  getPosts(id: number) {
    return this._http.get<Post[]>(this.postUrl + id);
  }

  getCommentsForPost(postId: number) {
    return this._http.get<PostComment[]>(this.postCommentsUrl + postId);
  }

  createComment(postComment: PostComment) {
    return this._http.post<number>(this.createPostCommentUrl, postComment);
  }

  deletePostComment(id: number) {
    return this._http.delete(this.deletePostCommentUrl + id);
  }

}
