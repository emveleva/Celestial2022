import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(public snackBar: MatSnackBar ) {}

  config: MatSnackBarConfig = {
    duration: 2500,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  success(msg:string) {
    this.config['panelClass'] = ['mint-background']
    this.snackBar.open(msg,'', this.config)
  }

  error(msg:string) {
    this.config['panelClass'] = ['red-background']
    this.snackBar.open(msg,'', this.config)
  }
}