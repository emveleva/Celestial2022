import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
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
      username: [''],
      password: [''],
      email: ['',
        [Validators.required
        ]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      imageUrl: ['',
        [Validators.pattern(
          /https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/\/=]*)/gm
        )]]
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const user = this.form.value;
      this.authService.register(user).subscribe({
        next: (res: any) => {
          this.router.navigate(['/articles']);
        },
        error: (res: HttpErrorResponse) => {
          this.notificationService.error(res.message)
        }
      });
    }
  }

}
