import { Injectable } from '@angular/core';
import { LoginResponse } from '../chat-app/model/login-response';
import { LoginBody } from '../chat-app/model/login-body';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly tokenKey = 'CHAT_APP_ACCESS_TOKEN';
  private accessToken: string | null = null;

  constructor(private httpClient: HttpClient) {}

  get AccessToken(): string | null {
    return this.accessToken;
  }

  public isAuthenticated() {
    if (this.accessToken) {
      return true;
    }
    const tokenString = this.getAccessTokenFromCookieStorge();
    if (tokenString) {
      const loginResponse = this.parseAccessToken(tokenString);
      const now = new Date().getDate();
      if (loginResponse.issuedAt.getDate() + loginResponse.duration > now) {
        this.accessToken = tokenString;
      }
      return true;
    }
    return false;
  }

  private parseAccessToken(token: string): LoginResponse {
    return JSON.parse(
      atob(token.substring(token.indexOf('.') + 1, token.lastIndexOf('.')))
    );
  }

  private getAccessTokenFromCookieStorge(): string | null {
    const cookies = document.cookie.split(';');
    const accessTokenCookie = cookies.find((e) => e.startsWith(this.tokenKey));
    if (accessTokenCookie) {
      return accessTokenCookie.substring(this.tokenKey.length + 1);
    }
    return null;
  }

  private saveAccessTokenIntoCookieStorage(token: string) {
    const cookies = document.cookie.split(';');
    const accessTokenCookie = cookies.find((e) => e.startsWith(this.tokenKey));
    if (accessTokenCookie) {
      cookies.splice(cookies.indexOf(accessTokenCookie), 1);
    }
    cookies.push(`${this.tokenKey}=${token}`);
    document.cookie = cookies.join(';');
  }

  public authenticate(loginBody: LoginBody) {
    this.httpClient
      .post(`${environment.apiUrl}/rest/login`, loginBody)
      .subscribe((resp:any) => {
        this.accessToken = resp.token;
      });
  }
}
