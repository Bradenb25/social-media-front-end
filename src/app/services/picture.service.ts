import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private pictureUrl: string;
  private uploadPictureUrl: string;
  private getPictureUrl: string;

  constructor(private _http: HttpClient) {
    this.pictureUrl = `/user/search?name=`;
    this.uploadPictureUrl = `/upload`;
    this.getPictureUrl = `/upload?name=`;
  }

  addPicture(file: File) {
    const formData: FormData = new FormData();
    formData.append('fileKey', file, file.name);
    return this._http
      .post(this.uploadPictureUrl, formData);
  }

  getPicture(username: string) {
    return this._http.get<any>(this.getPictureUrl + username);
  }



}
