import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { ArticlesRoutingModule } from './articles-routing.module';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleComponent } from './article/article.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';

@NgModule({
  declarations: [
      AddArticleComponent,
      ArticleComponent,
      ArticlesListComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    ArticlesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],

  exports: [
    RouterModule
  ]
})
export class ArticlesModule { }