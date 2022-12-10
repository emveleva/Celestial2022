import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {

  allowCreateEdit: boolean = true;
  article!: any;
  articles: Article[];
  title!: string;
  form!: FormGroup;
  articleId!: string;
  error!: string;
  notification!: string;
  userId: number;

  constructor(
    public articlesService: ArticlesService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }

  getUserId(): any {
    const userData = this.authService.getUserData();
    this.userId = userData.nameid;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: [this.article?.name, [
        Validators.required,
      ]],
      authorFirstName: 
        this.article?.authorFirstName
      ,
      authorLastName: this.article?.authorLastName,
      body: this.article?.body,
      imageUrl: [this.article?.imageUrl, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ]],
      appUserId: this.article?.appUserId || this.userId
    });
  }

  ngOnInit() {
    this.getUserId();
    this.buildForm();
  }
  
  onSubmit() {
    this.error = '';
    this.notification = '';
    this.articlesService.getArticles$().subscribe({
      next: (res) => {
        this.articles = res;
        this.title = this.form.get('name')?.value;
        this.articleId = this.form.get('id')?.value;
        if (this.form.valid) {
          if (!this.form.get('id')?.value) {
            for (let i = 0; i < this.articles.length; i++) {
              if (this.articles[i].title == this.title) {
                this.error = 'Article with this name already exists.';
                this.allowCreateEdit = false;
                break;
              }
            }
            if (this.allowCreateEdit) {
              this.articlesService.addArticle(this.form.value).subscribe({
                next: () => {
                  this.notification = 'New article added!'
                },
                error: (res: HttpErrorResponse) => {
                  console.log(res)
                  this.error = res.error;
                },
              });
            }
          } else {
            if (!this.form.pristine) {
              this.articlesService.editArticle(this.form.value).subscribe({
                next: () => {
                  this.notification = 'Article edited!';
                },
                error: (res: HttpErrorResponse) => {
                  this.error = res.error;
                },
              });
            } else {
              this.error = 'No changes were detected.';
            }
          }
        }
      },
    });
  }
}