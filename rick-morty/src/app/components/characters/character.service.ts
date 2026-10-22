import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharacter, ICharacterFilter, ICharacterResponse } from './characters.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  resourceUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  // getAllCharacters(page: number): Observable<HttpResponse<ICharacterResponse>> {
  //   return this.http.get<ICharacterResponse>(`${this.resourceUrl}/character?page=${page}`, {observe: 'response'});
  // } 

  //vamos a reescribir la llamada para que acepte filtros
  getAllCharacters(options?: ICharacterFilter): Observable<HttpResponse<ICharacterResponse>> {
    const params = this.convertOptionsIntoParams(options);
    return this.http.get<ICharacterResponse>(this.resourceUrl + '/character/' , {params: params, observe: 'response'}); 
  }

  getCharacter(id: number): Observable<HttpResponse<ICharacter>> {
    return this.http.get<ICharacter>(`${this.resourceUrl}/character/${id}`, {observe: 'response'});
  }

  // me devuelve una lista de characters
  getSpecificCharacters(ids: string[]): Observable<HttpResponse<ICharacter[]>> {
    return this.http.get<ICharacter[]>(`${this.resourceUrl}/character/${ids}`, {observe: 'response'});
  }

  private convertOptionsIntoParams(options?: ICharacterFilter): any {
    let result: any = {
      page: '',
      name: '',
      species: '',
      status: '',
      gender: ''
    };

    if (options) {
      if (options.page) {
        result.page = options.page;
      }
      if (options.name) {
        result.name = options.name;
      }
      if (options.species) {
        result.species = options.species;
      }
      if (options.status) {
        result.status = options.status;
      }
      if (options.gender) {
        result.gender = options.gender;
      }      
    }

    return result;
  }
}
