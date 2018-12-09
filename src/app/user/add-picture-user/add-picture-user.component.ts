import { Component, OnInit, Inject } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-picture-user',
  templateUrl: './add-picture-user.component.html',
  styleUrls: ['./add-picture-user.component.css']
})
export class AddPictureUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddPictureUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userSvc: UserService) { }

  ngOnInit() {
  }

  friends: any;
  fileToUpload: File = null;
  profilePicture: string;
  user: any;
  showGroup: boolean;
 
  changeFile(event: File) {
    this.fileToUpload = event;
    this.showGroup = true;
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

  uploadGroupPhoto() {
    this.userSvc.uploadProfilePic(this.fileToUpload).subscribe(data => {
      this.dialogRef.close();
    }, error => {
      console.log(error);
    });
  }

}
