import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { DataStorageService } from '../_services/data-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogConfirmDeleteComponent } from '../dialog-confirm-delete/dialog-confirm-delete.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user!: User;
  isLoggedIn = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private tokenStorage: TokenStorageService, private auth: AuthService, private snackbar: MatSnackBar,
    private router: Router, private dataSharingService: DataStorageService, private dialog: MatDialog
  ) {
    this.dataSharingService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
      this.isLoggedIn = !!this.tokenStorage.getToken();
      this.user = this.tokenStorage.getUser();
      console.log(this.user);
    });
  }

  isDefaultImage(): boolean {
    return this.user['image'] === "https://www.citypng.com/public/uploads/preview/download-profile-user-round-purple-icon-symbol-png-11639594314uv1zwqsazt.png";
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.dataSharingService.isLoggedIn.next(false);
    this.router.navigateByUrl('/home');
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangePasswordComponent, {
      height: "max-content",
      width: "max-content"
    });

  }

  openConfirmDeleteDialog(email: any): void {
    this.dialog.open(DialogConfirmDeleteComponent, {
      data: { user: email }
    });
  }
}
