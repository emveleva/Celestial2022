import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
        username: [''],
        password: ['']
    })
  }
}