import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { User } from 'src/app/models/user.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { EditorService } from 'src/app/services/editor.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  userId: number;
  user: User;

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService) {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getUserProfile();

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [this.user.id, [Validators.required]],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      imageUrl: [this.user.imageUrl,
        [Validators.pattern(
          /https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/\/=]*)/gm
        )]]
    })
  }

  getUserProfile(): void {
    this.userService.getProfile(this.userId).pipe(
      take(1)
    ).subscribe({
      next: (value) => {
        console.log(value)
        this.user = value;
        this.buildForm();
        
      },
      error(error: HttpErrorResponse) {
        console.log(error)
      }
    })
  }
  onBack() {
    this.router.navigate([`/profile`])
  }

  onSubmit(): void {
    console.log('hereee')
    console.log(this.form)
    if (!this.form.pristine) {
      this.userService.editProfile(this.form.value).subscribe({
        next: () => {
          this.notificationService.success('User edited!');
        },
        error: (res: HttpErrorResponse) => {
          this.notificationService.error(res.message)
        },
      });
    } else {
      this.notificationService.error('No changes were detected.');
      console.log('here')
    }
  }

}