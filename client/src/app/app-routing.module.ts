import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { ModeratorGuard } from './guards/moderator.guard';
import { HomeComponent } from './main/home/home.component';
import { NotFoundComponent } from './main/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent 
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin', loadChildren: () => import('./main/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'profile', loadChildren: () => import('./main/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard]
  },
  {
    path: 'articles', loadChildren: () => import('./main/articles/articles.module').then(m => m.ArticlesModule), canActivate: [AuthGuard]
  },
  {
    path: 'editor', loadChildren: () => import('./main/editor/editor.module').then(m => m.EditorModule), canActivate: [AuthGuard, ModeratorGuard]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
