import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
    `
    #sidebar {
      background-color: orange
    }
  `
  ]
})
export class LayoutPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public sidebarItems = [
    { label: 'AQNHQV', icon: 'label', url: './list-aqnhqv' },
    { label: 'LQSA', icon: 'label', url: './list-lqsa' },
    { label: 'Añadir', icon: 'add', url: './new-character' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]

  get user():User | undefined {
    return this.authService.currentUser;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

}
