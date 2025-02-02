import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { batchData } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  baseUrl = environment.apiUrl;
  getProductsUrl = environment.getProductsUrl;
  getInventaryUrl = environment.getInventaryUrl;
  getBatchByIdUrl = environment.getBatchByIdUrl;
  createBatchParamUrl = environment.createBatchParamUrl;

  constructor(private readonly http: HttpClient) { }

  getProducts(): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Authorization',
      'Authorization':  `${sessionStorage.getItem('authToken')}`
    });


    return this.http.get(`${this.baseUrl}${this.getProductsUrl}`, { headers, observe: 'response' });
  
  }

  getBatchById(idBatch: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Authorization',
      'Authorization':  `${sessionStorage.getItem('authToken')}`
    });

    return this.http.get(`${this.baseUrl}${this.getBatchByIdUrl}${idBatch}`, { headers, observe: 'response' });
  }

  createBatch(batch: batchData): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Authorization',
      'Authorization':  `${sessionStorage.getItem('authToken')}`
    });

    return this.http.post(`${this.baseUrl}${this.createBatchParamUrl}`, batch, { headers, observe: 'response' });
  }

  UpdateBatch(batch: batchData): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Authorization',
      'Authorization':  `${sessionStorage.getItem('authToken')}`
    });

    return this.http.put(`${this.baseUrl}${this.createBatchParamUrl}${batch.Idbatch}`, batch, { headers, observe: 'response' });
  }

  DeleteBatch(Idbatch: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Authorization',
      'Authorization':  `${sessionStorage.getItem('authToken')}`
    });

    return this.http.delete(`${this.baseUrl}${this.createBatchParamUrl}${Idbatch}`, { headers, observe: 'response' });
  }

  getInventary(): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Authorization',
      'Authorization':  `${sessionStorage.getItem('authToken')}`
    });


    return this.http.get(`${this.baseUrl}${this.getInventaryUrl}`, { headers, observe: 'response' });
  }
}
