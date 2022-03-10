import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from './constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  _baseURL: string;

  constructor(private http: HttpClient) {
    this._baseURL = AppConstants.apiBienestar;
  }

  getFile(obj, type, doc): Observable<any> {
    const url = `${this._baseURL}/api/estados-cuenta/agentes/${type}/${doc}`;

    console.log(url);

    console.log(obj);

    return this.http
      .get(url, {
        headers: new HttpHeaders({
          Accept: '*/*',
        }),
        params: this.cleanObject(obj),
      })
      .pipe(map((data) => data));
  }

  cleanObject(obj) {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ''
      ) {
        delete obj[propName];
      }
    }
    return obj;
  }
}
