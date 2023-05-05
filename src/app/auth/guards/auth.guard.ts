
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { tap, Observable, take } from 'rxjs';

import { AuthService } from '../services/auth.service';

// Decorador Injectable para proporcionar una instancia de esta clase en la raíz de la aplicación
@Injectable({ providedIn: 'root' })

export class AuthGuard {
}

// Definición de la función 'isAuthenticated', que devuelve un tipo complejo de datos
const isAuthenticated = (): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {

// Inyección de dependencias de los servicios 'AuthService' y 'Router'
const authService = inject(AuthService);
const router = inject(Router);

// Devolución de la autenticación verificada mediante un observable
return authService.checkAuthentication().pipe(
    take(1), // El operador 'take(1)' asegura que se emita solo el primer valor del observable y luego se complete
    tap((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
            // Redireccionamiento al componente de inicio de sesión si no está autenticado
            router.navigate(['./auth/login']);
        }
    }),
);
}


export const canActivateGuard: CanActivateFn = isAuthenticated;

export const canMatchGuard: CanMatchFn = isAuthenticated;