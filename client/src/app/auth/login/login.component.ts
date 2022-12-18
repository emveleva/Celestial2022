import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators'
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  auth!: string;
  token!: string | null;
  error!: string;
  form!: FormGroup;
  
  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) { }

    ngOnInit(): void {
      this.buildForm();
    }

    private buildForm() {
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    })
  }
  onSubmit() {
    if (this.form.valid) {
    this.authService.login(this.form.value).pipe(take(1)).subscribe({
      next: (res) => {
        this.router.navigate(['/articles']);
      },
      error: (res: HttpErrorResponse) => {
          this.notificationService.error('Incorrect username or password.');
      },
    });
  }}
}