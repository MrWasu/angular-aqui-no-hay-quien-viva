import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser():User|undefined {
    if ( !this.user ) return undefined;
    return structuredClone( this.user );
  }
  
  login( email: string, password: string ):Observable<User> {

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        tap( user => localStorage.setItem('mockToken', 'df7sdffv7sdfv56sdf7' )),
      );
  }

  checkAuthentication(): Observable<boolean> { 
    // Define un método que comprueba si el usuario está autenticado y devuelve un Observable que emite un booleano
    
    // Si no hay un token de autenticación en el localStorage, devuelve un Observable que emite un valor booleano false
    if ( !localStorage.getItem('mockToken') ) return of(false); 


    const token = localStorage.getItem('mockToken'); 

    // Realiza una petición HTTP GET a la URL `${baseUrl}/users/1` y espera una respuesta de tipo User
    return this.http.get<User>(`${ this.baseUrl }/users/1`) 
      .pipe(
        // Ejecuta una función tap que asigna la respuesta a la propiedad user
        tap( user => this.user = user ), 
        // Ejecuta una función map que devuelve un booleano true si user existe o false si es null o undefined
        map( user => !!user ), 
        // Captura cualquier error que se produzca y devuelve un Observable que emite un booleano false
        catchError( err => of(false) ) 
      );

  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }


}
