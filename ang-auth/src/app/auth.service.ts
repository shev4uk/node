import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlApi = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  signin(user: User): Observable<any> {
    return this.http.post(`${this.urlApi}auth/signin`, user);
  }
  signup(user: User): Observable<any> {
    return this.http.post(`${this.urlApi}auth/signup`, user);
  }
}
