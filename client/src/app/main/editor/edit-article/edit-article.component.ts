import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  id!: string | null;
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
    public editorService: EditorService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public articlesService: ArticlesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    
  ) {
  }


   getArticleDetails(){
     this.id = this.activatedRoute.snapshot.params.id;
     if (this.id){
     this.editorService.getOneArticle(this.id).subscribe({
       next: (res) => {
         this.article = res
         this.buildForm();
       }
     })
   }
   }

  getUserId(): any {
    const userData = this.authService.getUserData();
    this.userId = userData.nameid;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: [this.article?.title, [
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
    this.getArticleDetails();
   
  }

  onBack() {
    this.router.navigate([`editor/`])
  }
  
  onSubmit() {
    this.error = '';
    this.notification = '';
    this.articlesService.getArticles$().subscribe({
      next: (res) => {
        this.articles = res;
        this.title = this.form.get('title')?.value;
        this.articleId = this.form.get('id')?.value;
        if (this.form.valid) {
          if (!this.form.get('id')?.value) {
            console.log(this.articles.length)
            for (let i = 0; i < this.articles.length; i++) {
              console.log(this.articles[i].title)
              console.log(this.title)
              console.log(this.articles[i].title === this.form.get('title')?.value)
              console.log(this.articles[i].title == this.form.get('title')?.value)

              if (this.articles[i].title === this.form.get('title')?.value) {
                console.log('Article with this name already exists.')
                this.error = 'Article with this name already exists.';
                this.allowCreateEdit = false;
                break;
              }
            }
            console.log(this.allowCreateEdit)
            if (this.allowCreateEdit) {
              console.log('here')
              this.editorService.addArticle(this.form.value).subscribe({
                next: () => {
                  console.log('new article added')
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
              this.editorService.editArticle(this.form.value).subscribe({
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

