import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user.model'

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
    private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.buildForm();
    }

    private buildForm() {
      this.form = this.formBuilder.group({
        username: [''],
        password: [''],
        email: ['',
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]+$/),
        ],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        imageUrl: ['',
          Validators.pattern(
            /https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/\/=]*)/gm
        )]})
    }

  onSubmit(){
    // if (user.password !== user.rePassword){
    //   // this.notificationsService.error("The passwords you entered don't match.")
    // } else if (user.password.length < 6){
    //   // this.notificationsService.error("Your password should contain at least 6 characters.")
    // }else {
    // const { email, password } = user;
    // const hiredDevs: [] = [];
    // this.authService.register(email, password ).subscribe({
    //   next: (res: any) => {
    //     this.auth = res['accessToken'];
    //     localStorage.setItem('token', this.auth);
    //     this.token = res['accessToken']
    //     this.router.navigate(['/'])
    //   },
    //   error: (res: HttpErrorResponse) => {
    //     // this.notificationsService.error(res.error)
    //   }
    // });
  // }
}
}
