import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean; // ? here means optional
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _userId = null;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  get userId() {
    return this._userId;
  }

  constructor(private router: Router, private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      { email: email, password: password, returnSecureToken: true }
    );
  }

  login() {
    //this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
    this.router.navigateByUrl("/auth");
  }
}
