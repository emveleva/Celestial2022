import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    LogoutComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],

  exports: [
    RouterModule
  ]
})
export class AuthModule { }