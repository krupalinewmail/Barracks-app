import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RetentionService } from '../../auth/services/retention.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [            RouterLink, CommonModule,
    RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private authenticationService: AuthenticationService,private  httpClient:HttpClient,private retentionService: RetentionService) { }
  get isLoggedIn():boolean{
    return this.authenticationService.isLoggedIn;
  }
  logOut(){
    this.authenticationService.logout();

  }
}
