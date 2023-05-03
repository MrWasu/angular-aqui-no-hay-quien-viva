import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

import { Character } from '../interfaces/character.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class CharacterService {

  private baseUrl: string = environments.baseUrl;


  constructor(private http: HttpClient) { }


  getCharacters():Observable<Character[]> {
    return this.http.get<Character[]>(`${ this.baseUrl }/characters`);
  }

  getCharacterById( id: string ): Observable<Character|undefined> {
    return this.http.get<Character>(`${ this.baseUrl }/characters/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  getSuggestions( query: string ): Observable<Character[]> {
    return this.http.get<Character[]>(`${ this.baseUrl }/characters?q=${ query }&_limit=6`); 
  }



}