import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchUrl: string;

  constructor(private _http: HttpClient) {
    this.searchUrl = `/user/search?name=`; 
  }

  search(query: string) {
    return this._http.get(this.searchUrl + query);
  }


}
