import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEpisodeResponse } from './episodes.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  resourceUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  // se conecta con el api de rick y morty para traerse todos los episodios.
  // acepta un parámetro de tipo number para especificar la página (paginado) que quiero
  getAllEpisodes(page: number): Observable<HttpResponse<IEpisodeResponse>> {
    return this.http.get<IEpisodeResponse>(`${this.resourceUrl}/episode/?page=${page}`, {observe: 'response'});
  }

  getEpisodeByName(name: string): Observable<HttpResponse<IEpisodeResponse>> {
    return this.http.get<IEpisodeResponse>(`${this.resourceUrl}/episode/?name=${name}`, {observe: 'response'});
  }
}
