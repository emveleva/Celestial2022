import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditorRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EditRoleDialogComponent } from './edit-role-dialog/edit-role-dialog.component';


@NgModule({
  declarations: [
    AdminPanelComponent,
    EditRoleDialogComponent
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
export class AdminModule { }