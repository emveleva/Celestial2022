import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { EditorRoutingModule } from './editor-routing.module';
import { MyArticlesListComponent } from './my-articles-list/my-articles-list.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { MaterialModule } from 'src/app/material/material.module';
import { EditArticleComponent } from './edit-article/edit-article.component';


@NgModule({
  declarations: [
    AddArticleComponent,
    ArticleDetailsComponent,
    MyArticlesListComponent,
    EditArticleComponent
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
export class EditorModule { }