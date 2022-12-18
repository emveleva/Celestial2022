import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LikedArticlesListComponent } from './liked-articles/liked-articles-list.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  {
    path: '', component: MyProfileComponent
  },
  {
    path: 'edit/:id', pathMatch: 'full', component: EditProfileComponent
  },
  {
    path: 'liked/:id', pathMatch: 'full', component: LikedArticlesListComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }