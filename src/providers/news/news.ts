import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class NewsProvider {

  country: string;
  link: string;

  constructor(public http: HttpClient) {
  }

  getNews(country): Observable<any> {
    this.country = country;
    this.link = 'https://newsapi.org/v2/top-headlines?country='+country+'&pageSize=5&apiKey=6d97135466724a2491380a91d9a095ba';
    return this.http.get(this.link);
  }
}
