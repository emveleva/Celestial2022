import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {
  constructor(public authService: AuthService, 
    private router: Router) { 
  }

  logoutClick() {
    this.authService.logout();
    this.router.navigate((['/']))
  }
}