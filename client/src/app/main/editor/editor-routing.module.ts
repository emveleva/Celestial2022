import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsavedChangesGuard } from 'src/app/guards/unsaved-changes.guard';
import { ArticleComponent } from '../articles/article/article.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { MyArticlesListComponent } from './my-articles-list/my-articles-list.component';

const routes: Routes = [
  {
    path: '', component: MyArticlesListComponent
  },
  {
    path: 'add', pathMatch: 'full', component: AddArticleComponent
  },
  {
    path: 'edit/:id', pathMatch: 'full', component: EditArticleComponent, canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: ':id', pathMatch: 'full', component: ArticleDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }