import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from './constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  _baseURL: string;

  constructor(private http: HttpClient) {
    // this._baseURL = AppConstants.apiBienestar;
    this._baseURL = environment.apiURL;
  }

  getFile(obj, type, doc): Observable<any> {
    const url = `${this._baseURL}/estados-cuenta/agentes/${type}/${doc}`;

    return this.http
      .get(url, {
        headers: new HttpHeaders({
          Accept: '*/*',
        }),
        params: this.cleanObject(obj),
      })
      .pipe(map((data) => data));
  }

  getPeriodo(obj): Observable<any> {
    const url = `${this._baseURL}/estados-cuenta/periodo`;

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
