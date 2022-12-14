import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {
  user: User;

  constructor(public authService: AuthService, 
    private router: Router) { 
      // this.authService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  logoutClick() {
    this.authService.logout();
    this.router.navigate((['/']))
  }
}