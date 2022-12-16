import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { User } from 'src/app/models/user.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { EditorService } from 'src/app/services/editor.service';
import { NotificationService } from 'src/app/services/notification.service';

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
  user: User;

  constructor(
    public editorService: EditorService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public articlesService: ArticlesService,
    private router: Router,
    private nofiticationService: NotificationService
  ) {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: [this.article?.title, [
        Validators.required,
      ]],
      authorFirstName:
        this.user.firstName
      ,
      authorLastName:  this.user.firstName,
      body: [this.article?.body, [
        Validators.required,
      ]],
      imageUrl: [this.article?.imageUrl, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ]],
      appUserId: this.article?.appUserId || this.user.id
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  onBack() {
    this.router.navigate([`editor/`])
  }

  onSubmit() {
    console.log(this.form.value)
    this.editorService.addArticle(this.form.value).subscribe({
      next: (res) => {
        this.nofiticationService.success("Article added")
      },
      error: (error: HttpErrorResponse) => {
        this.nofiticationService.error(error.message);
      },
    });
  }
}

