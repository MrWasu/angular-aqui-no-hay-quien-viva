import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [    `
  .mat-btn {
    background-color: orange !important;
  }
`
  ]
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onLogin(): void {

    this.authService.login('ejemplo@gmail.com','123456')
      .subscribe( user => {

        this.router.navigate(['/']);

      });

  }

}
