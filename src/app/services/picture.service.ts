import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private pictureUrl: string;
  private uploadPictureUrl: string;
  private getPictureUrl: string;

  constructor(private _http: HttpClient, private _sanitizer: DomSanitizer, private usrSvc: UserService) {
    this.pictureUrl = `/user/search?name=`;
    this.uploadPictureUrl = `/upload`;
    this.getPictureUrl = `/user/profile-pic?username=`;
  }

  addPicture(file: File) {
    const formData: FormData = new FormData();
    formData.append('fileKey', file, file.name);
    return this._http
      .post(this.uploadPictureUrl, formData);
  }

  getPicture(username: string = this.usrSvc.getSecurityObject().userName) {
    return this._http.get<any>(this.getPictureUrl + username);
  }

  getPictureFromBuffer(buffer: any) {
    var getImageResult = buffer;
    var binstr = Array.prototype.map.call(getImageResult.data, function (ch) {
      return String.fromCharCode(ch);
    }).join('');
    let data = btoa(binstr);
    let picture = "data:image/jpg;base64," + data;
    return this._sanitizer.bypassSecurityTrustUrl(picture);
  }

}
