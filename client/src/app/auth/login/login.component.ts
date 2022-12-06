import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators'

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
    private formBuilder: FormBuilder) { }

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
    this.authService.login(this.form.value).pipe(take(1)).subscribe({
      next: (res) => {
        console.log(res)
        this.auth = res['token'];
        localStorage.setItem('token', this.auth);
        this.router.navigate(['/articles']);
      },
      error: (res: HttpErrorResponse) => {
        if (res.error == 'Incorrect password' || 'Cannot find user') {
          // this.notificationService.error('Incorrect username or password.');
        } else {
          // this.notificationService.error(res.error);
        }
      },
    });
  }
}