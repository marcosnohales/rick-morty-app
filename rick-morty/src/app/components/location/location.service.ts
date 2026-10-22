import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocationResponse } from './location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  resourceUrl = 'https://rickandmortyapi.com/api';


  constructor(private http: HttpClient) {}

  getAllLocations(page: number): Observable<HttpResponse<ILocationResponse>> {
    return this.http.get<ILocationResponse>(`${this.resourceUrl}/location?page=${page}`, {observe: 'response'});
  }
}
