import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';


@Injectable({
  providedIn: 'root'
})
export class ModeratorGuard implements CanActivate {
  constructor(private authService: AuthService, private notificationService: NotificationService) { }

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (user.roles.includes('Admin') || user.roles.includes('Moderator')) {
          return true;
        }
        this.notificationService.error('You cannot enter this area');
      })
    )
  }
}