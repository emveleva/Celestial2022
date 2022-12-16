import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { User } from 'src/app/models/user.model';
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
export class MyProfileComponent {
  id!: string | null;
  article!: Article;
  user: User;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private notificationService: NotificationService,
    private dialogRef: MatDialog, 
    private router: Router, 
    private editorService: EditorService,
    private authService: AuthService
  ) {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  onEdit(id: number) {
    this.router.navigate([`profile/edit/${id}`])
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