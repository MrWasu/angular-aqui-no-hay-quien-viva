import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

import { Character, Serie } from '../interfaces/character.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class CharacterService {

  private baseUrl: string = environments.baseUrl;


  constructor(private http: HttpClient) { }


  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters/`);
  }

  getCharacterById(id: string): Observable<Character | undefined> {
    return this.http.get<Character>(`${this.baseUrl}/characters/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  getSuggestions(query: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters?q=${query}&_limit=6`); 
  }

  addCharacter(character: Character): Observable<Character> {
    return this.http.post<Character>(`${this.baseUrl}/characters`, character);
  }

  updateCharacter(character: Character): Observable<Character> {
    if (!character.id) throw Error('Character id is required');

    return this.http.patch<Character>(`${this.baseUrl}/characters/${character.id}`, character);
  }

  deleteCharacterById(id: string): Observable<boolean> {

    return this.http.delete(`${this.baseUrl}/characters/${id}`)
      .pipe(
        map(resp => true),
        catchError(err => of(false)),
      );
  }



}