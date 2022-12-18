import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditorRoutingModule } from './profile-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LikedArticlesListComponent } from './liked-articles/liked-articles-list.component';


@NgModule({
  declarations: [
    MyProfileComponent,
    EditProfileComponent,
    LikedArticlesListComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    EditorRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],

  exports: [
    RouterModule
  ]
})
export class ProfileModule { }