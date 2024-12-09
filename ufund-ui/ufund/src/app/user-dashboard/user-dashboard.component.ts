import { Component, OnInit } from '@angular/core';
import { Need } from '../need/need';
import { NeedService } from '../need.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
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
