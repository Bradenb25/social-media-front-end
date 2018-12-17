import { Component, OnInit, Inject } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCropData } from '../shared/models/image-crop-data';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.css']
})
export class AddPictureComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddPictureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupSvc: GroupService) { }

  ngOnInit() {
  }

  friends: any;
  fileToUpload: File = new File([new Blob], '', new Object());
  profilePicture: string;
  user: any;
  showGroup: boolean;
  imageChangedEvent: any = '';
  croppedImage: any = '';
 
  changeFile(event: File) {
    this.fileToUpload = event;
    this.showGroup = true;
  }  

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
    this.groupSvc.changePhoto(this.fileToUpload, this.data.groupId).subscribe(data => {
      this.dialogRef.close({ status: 'success' });
    }, error => {
      this.dialogRef.close({ status: 'failed' });
    });
  }

}
