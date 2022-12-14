import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { EditorService } from 'src/app/services/editor.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  id!: string | null;
  article!: Article;

  constructor(private activatedRoute: ActivatedRoute, private notificationService: NotificationService,
    private dialogRef: MatDialog, private router: Router, private editorService: EditorService) {
    
   }

  ngOnInit() {
    this.getArticleDetails();
 
   }
 
   getArticleDetails(){
     this.id = this.activatedRoute.snapshot.params.id;
     if (this.id){
     this.editorService.getOneArticle(this.id).subscribe({
       next: (res) => {
         this.article = res
       }
     })
   }
   }
   onEdit(id: number){
    this.router.navigate([`editor/edit/${id}`])
  }

    onDelete(id: string) {
      const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
        width: '30%',
        data: {
          title: 'Are you sure you want to delete this article?',
        },
      });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {       
                this.editorService.deleteArticle(id).subscribe({
                  next: () => {
                    this.notificationService.success('Article deleted.');
                    this.router.navigate(['editor'])
                  },
                });
        }
      });
    }
  }