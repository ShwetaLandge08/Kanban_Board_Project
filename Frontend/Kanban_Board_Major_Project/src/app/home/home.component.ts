import { Component } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { DataStorageService } from '../_services/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggedIn = false;
  constructor(private tokenStorage: TokenStorageService,
    private dataSharingService: DataStorageService) {
    this.dataSharingService.isLoggedIn.subscribe((value) => {
      this.isLoggedIn = value;
      this.checkLogin();
    });
  }

  checkLogin(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
  }

  ngOnInit(): void {
    console.log(this.isLoggedIn);
  }
}
