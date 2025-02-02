import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../enviroment/enviroment';
import { loginData } from '../utils/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;
  authUserUrl = environment.authUserUrl;

  constructor(private readonly http: HttpClient) { }

  authUser(username: string, password: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Authorization'
    });

    const loginData: loginData = {
      email: username,
      password: password
    };

    return this.http.post(`${this.baseUrl}${this.authUserUrl}`, loginData, { headers, observe: 'response' });
  }

}
