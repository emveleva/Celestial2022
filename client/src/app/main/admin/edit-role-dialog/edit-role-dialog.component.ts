import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { User } from "src/app/models/user.model";

@Component({
    selector: 'app-edit-role-dialog',
    templateUrl: './edit-role-dialog.component.html',
    styleUrls: ['./edit-role-dialog.component.scss'],
})
export class EditRoleDialogComponent implements OnInit, OnDestroy {
    user: User;
    roles: any[];
    form: FormGroup;
    destroy$ = new Subject<boolean>();

    constructor(
        public dialogRef: MatDialogRef<EditRoleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) 
        public data: any,
        private formBuilder: FormBuilder
    ) { 
        this.user = this.data.user;
        this.roles = this.data.roles;
    }

    ngOnInit(): void {
        this.buildForm();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    private buildForm() {
        this.form = this.formBuilder.group({
          Admin: this.roles[0].checked,
          Moderator: this.roles[1].checked,
          User: this.roles[2].checked
      })
      this.listenForAdminValueChange();
      this.listenForModeratorValueChange();
      this.listenForUserValueChange();
    }

    private   listenForAdminValueChange(): void {
        this.form.get("Admin").valueChanges.pipe(
            takeUntil(this.destroy$)
            ).subscribe(checked => {
                if (checked) {
                    this.roles[0].checked = true
                } else {
                    this.roles[0].checked = false
                }
            
         })
    }

private   listenForModeratorValueChange(): void {
        this.form.get("Moderator").valueChanges.pipe(
            takeUntil(this.destroy$)
            ).subscribe(checked => {
                if (checked) {
                    this.roles[1].checked = true
                } else {
                    this.roles[1].checked = false
                }
         })
    }

    private    listenForUserValueChange(): void {
        this.form.get("User").valueChanges.pipe(
            takeUntil(this.destroy$)
            ).subscribe(checked => {
                if (checked) {
                    this.roles[2].checked = true
                } else {
                    this.roles[2].checked = false
                }
         })
    }
    updateRoles(): void {
        this.dialogRef.close(this.roles);
    }

    onClose() {
        this.dialogRef.close(null);
    }
}


