import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../shared/custom/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  config = new Config();
  private url;
  public headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('x-access-token', 'Bearer 1234')

  constructor(private _http: HttpClient,) {
    this.url = this.config.USER_LOGIN_API;
  }


  login(user): Observable<any> {
    return this._http.post(`${this.config.USER_LOGIN_API}`, user, { headers: this.headers })
  }

}
