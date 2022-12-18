import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { User } from "src/app/models/user.model";
import { AdminService } from "src/app/services/admin.service";
import { NotificationService } from "src/app/services/notification.service";
import { EditRoleDialogComponent } from "../edit-role-dialog/edit-role-dialog.component";

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss'],
  })
  export class AdminPanelComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['username', 'user roles', 'action'];
    user!: User;
    users: Partial<User[]>;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    sort!: MatSort;
    dataSource = new MatTableDataSource<User>();
  
    constructor(
        private adminService: AdminService, 
        private dialogRef: MatDialog, 
        private notificationService: NotificationService,
        private changeRef: ChangeDetectorRef
    ) {
      this.dataSource = new MatTableDataSource(this.users);
    }
    
      ngAfterViewInit() {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        
      }
  
      ngOnInit(): void {
        this.getUsersWithRoles();
      }
    
      getUsersWithRoles() {
        this.adminService.getUsersWithRoles().subscribe(users => {
          this.users = users;
          this.dataSource.data = this.users;
          console.log(this.users)
        })
      }
    
      openRolesDialog(user: User, roles: []) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '30%';
        dialogConfig.data = { user, roles: this.getRolesArray(roles) };
        const ref = this.dialogRef.open(EditRoleDialogComponent, dialogConfig);
        ref.afterClosed().subscribe({
          next: (res) => {
            if (res) {
                console.log(res)
              const rolesToUpdate = {
                roles: [...res.filter(el => el.checked === true).map(el => el.name)]
              };
              if (rolesToUpdate) {
                console.log(rolesToUpdate)
                this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(() => {
                  user.roles = [...rolesToUpdate.roles]
                  this.getUsersWithRoles()
                  this.changeRef.detectChanges();
                })
              }
       
              this.notificationService.success(res.message);
            }
          },
        });
      }
    
      getRolesArray(userRoles) {
        console.log(userRoles)
        const roles = [];
        const availableRoles: any[] = [
          { name: 'Admin', value: 'Admin' },
          { name: 'Moderator', value: 'Moderator' },
          { name: 'User', value: 'User' }
        ];
    
        availableRoles.forEach(role => {
          let isMatch = false;
          for (const userRole of userRoles) {
            if (role.name === userRole) {
              isMatch = true;
              role.checked = true;
              roles.push(role);
              break;
            }
          }
          if (!isMatch) {
            role.checked = false;
            roles.push(role);
          }
        })
        return roles;
      }
  }