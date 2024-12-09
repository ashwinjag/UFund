import { Component } from '@angular/core';
import { Need } from '../need/need';
import { NeedService } from '../need.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  needs: Need[] = [];

  constructor(private needService: NeedService, private authService: AuthService, private router: Router) {
    if(this.authService.getLoginData().user == undefined){
      alert("Login required to access dashboard");
      this.router.navigateByUrl('/login');
    }
    else if(this.authService.getLoginData().user?.isAdmin){
      this.router.navigateByUrl('/admin-dashboard');
    }
  }

  ngOnInit(): void {
    this.getNeeds();
  }

  getNeeds(): void {
    this.needService.getNeeds()
    .subscribe(needs => this.needs = needs.slice(1,5));
  }
}
