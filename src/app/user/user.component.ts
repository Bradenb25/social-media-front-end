import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../services/friends.service';
import { PictureService } from '../services/picture.service';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private friendsService: FriendsService,
    private pictureService: PictureService,
    private userSvc: UserService) { }

  friends: any;
  fileToUpload: File = null;
  profilePicture: string;
  user: any;

  ngOnInit() {
    this.friendsService.getFriendsForUser()
      .subscribe(x => {
        this.friends = x;
        console.log(JSON.stringify(x));
      })
      this.user = this.userSvc.getSecurityObject();
    this.profilePicture = this.getProfilePictureUrl();
  }

  getProfilePictureUrl() {
    return environment.baseUrl + '/user/profile-pic?username=' + this.userSvc.getSecurityObject().userName;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.pictureService.addPicture(this.fileToUpload).subscribe(data => {
      // do something, if upload success
    }, error => {
      console.log(error);
    });
  }

  changeFile(event: File) {
    this.fileToUpload = event;
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.fileToUpload = new File([event.file], 'filename');
  }
  imageLoaded() { 
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

}
