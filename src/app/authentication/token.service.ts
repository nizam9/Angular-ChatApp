import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'hours');
    localStorage.setItem('token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    this.setUserDetails(authResult);
  }

  setUserDetails(user) {
    localStorage.setItem('userDetails', JSON.stringify(user));
  }

  getUserDetails() {
   return JSON.parse(localStorage.getItem('userDetails'));
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}