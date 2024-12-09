import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'No Child Left Behind';

  constructor(private authService: AuthService, private router: Router) {}

  isUser(): boolean {
    const { user } = this.authService.getLoginData();
    return !! user && !user.isAdmin;
  }

  isAdmin(): boolean {
    const { user } = this.authService.getLoginData();
    return user?.isAdmin ?? false;
  }

  logOut(): void {
    this.authService.clearLoginData();
    this.router.navigateByUrl('/login');
  }
}
