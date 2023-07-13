import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { DataStorageService } from '../_services/data-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: string = '';
  isLoggedIn = false;
  username?: string;
  home?: string;
  profilePhoto?: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private tokenStorage: TokenStorageService,
    private router: Router, private dataSharingService: DataStorageService, private dialog: MatDialog
  ) {
    this.dataSharingService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
      this.checkLogin();
    });
  }

  checkLogin(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      //this.user = user;
      this.username = user.name;
      //this.profilePhoto = user.profilePhoto;
    }
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

  // openUpdateUserDialog() {
  //   this.dialog.open(UpdateUserComponent, {
  //     height: "max-content",
  //     width: "max-content"
  //   });
  // }
}
