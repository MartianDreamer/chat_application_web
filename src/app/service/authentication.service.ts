import { Injectable } from '@angular/core';
import { LoginBody } from '../chat-app/model/login-body';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly tokenKey = 'CHAT_APP_ACCESS_TOKEN';

  constructor() {}
  private accessToken: string | undefined;

  get AccessToken(): string | undefined {
    if (this.accessToken) return this.accessToken;
    this.accessToken = this.getAccessTokenFromCookieStorge();
    return this.accessToken;
  }

  public isAuthenticated() {
    if (this.accessToken) return true;
    const tokenString = this.getAccessTokenFromCookieStorge();
    if (tokenString) {
      const loginResponse = this.parseAccessToken(tokenString);
      const now = Math.round(Date.now() / 1000);
      if (loginResponse.exp > now) {
        return true;
      }
    }
    return false;
  }

  private parseAccessToken(token: string): any {
    return JSON.parse(
      atob(token.substring(token.indexOf('.') + 1, token.lastIndexOf('.')))
    );
  }

  private getAccessTokenFromCookieStorge(): string | undefined {
    const cookies = document.cookie.split(';');
    cookies.forEach((e) => e.trimStart());
    const accessTokenCookie = cookies.find((e) => e.startsWith(this.tokenKey));
    if (accessTokenCookie) {
      return accessTokenCookie.substring(this.tokenKey.length + 1);
    }
    return;
  }

  saveAccessTokenIntoCookieStorage(
    token: string,
    issuedAt: string,
    duration: number
  ) {
    this.accessToken = token;
    const expired = Date.parse(issuedAt) + duration;
    const expiredDate = new Date();
    expiredDate.setDate(expired);
    document.cookie = `${
      this.tokenKey
    }=${token};Expires=${expiredDate.toUTCString()};path=/;`;
  }

  deleteToken() {
    const token = this.accessToken
      ? this.accessToken
      : this.getAccessTokenFromCookieStorge();
    const expiredDate = new Date(0);
    document.cookie = `${
      this.tokenKey
    }=${token};Expires=${expiredDate.toUTCString()};Path=/;`;
  }
}
