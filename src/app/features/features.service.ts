import { Injectable } from '@angular/core';
import { Config } from '../shared/custom/constants';

import { Observable, of } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  config = new Config();
  public headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('x-access-token', 'Bearer 1234')

  constructor(private _http: HttpClient,) {
  }


  fetchUsers(): Observable<any> {
    return this._http.get(`${this.config.FETCH_USERS}`, { headers: this.headers })
  }

  createChat(users): Observable<any> {
    console.log(users , 'usersusersusers');
    const body = {
      chatName:'firstChat',
      isGroupChat:false,
      users:users
    }
    return this._http.post(`${this.config.CREATE_CHAT}`, body, { headers: this.headers })
  }

  fetchChats(user): Observable<any> {
    return this._http.get(`${this.config.FETCH_CHATS}/${user._id}`, { headers: this.headers })
  }
}
