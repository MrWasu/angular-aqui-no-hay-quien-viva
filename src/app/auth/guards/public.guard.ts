import { Injectable, inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router'; 
import { tap, Observable, take, map } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardLogged {
}

const isLogged = (): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {

    const authService = inject(AuthService);
    const router = inject(Router);
   
    return authService.checkAuthentication()
    .pipe( // El operador 'pipe' permite encadenar varios operadores de RxJS para transformar el flujo de datos
        tap( isAuthenticated => console.log('Authenticated:', isAuthenticated ) ),
        // El operador 'tap' permite realizar acciones secundarias en el flujo de datos sin afectar al valor original
        tap( isAuthenticated => {
          if ( isAuthenticated ) {
            router.navigate(['./'])
          }
        }),
        // El operador 'map' transforma el valor emitido por el observable en un valor booleano inverso
        map( isAuthenticated => !isAuthenticated )
    )
}

export const canActivateLoggedGuard: CanActivateFn = isLogged;
export const canMatchLoggedGuard: CanMatchFn = isLogged;