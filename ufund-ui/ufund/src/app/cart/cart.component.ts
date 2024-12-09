import { Component, OnInit } from '@angular/core';
import { Need } from '../need/need';
import { NeedService } from '../need.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartNeeds: Need [] = [];
  totalMoneyRaised = 0;
  totalNeedsSold = 0;
  stats = new Map();
  topNeeds: [string, number][] = [];

  constructor(private needService: NeedService, private authService: AuthService, private router: Router) { 
    if(this.authService.getLoginData().user == undefined){
      alert("Login required to access cart")
      this.router.navigateByUrl('/login');
    }
    else if(this.authService.getLoginData().user?.isAdmin){
      alert("U-fund manager cannot access funding basket");
      this.router.navigateByUrl('/admin-dashboard');
    }
  }

  ngOnInit(): void {
      this.loadStats();
      this.loadCart();
      this.topNeeds = this.getTopNeeds(this.stats);
  }

  loadCart(): void {
    this.cartNeeds = this.needService.getCart();
  }

  addToCart(need: Need): void {
    this.needService.addToCart(need);
    this.loadCart();
  }

  removeFromCart(id: number): void {
    this.needService.removeFromCart(id);
    this.loadCart();
  }

  clearCart(): void {
    this.needService.clearCart();
    this.cartNeeds = []
  }
  getTotal(): number {
    let totalCost = 0;
    this.cartNeeds.forEach((need : Need) => {
      totalCost += need.cost * need.quantity;
    });
    return Number(totalCost.toFixed(2));
  }

  checkout(): void {
    this.saveStats()
    this.topNeeds = this.getTopNeeds(this.stats);
    this.needService.checkout();
    this.cartNeeds = [];
  }

  saveStats(): void {
    this.cartNeeds.forEach((need: Need) => {
      if (!this.stats.has(need.name)){
        this.stats.set(need.name, need.quantity);
      }
      else {
        this.stats.set(need.name, (this.stats.get(need.name)! + need.quantity));
      }
      this.totalMoneyRaised += need.cost * need.quantity;
      this.totalNeedsSold += need.quantity;
    });

    localStorage.setItem('stats', JSON.stringify(Object.fromEntries(this.stats)));
    localStorage.setItem('moneyRaised', JSON.stringify(this.totalMoneyRaised));
    localStorage.setItem('needsSold', JSON.stringify(this.totalNeedsSold));
  }

  loadStats(): void {
    const savedStats = localStorage.getItem('stats');
    const savedMoneyRaised = localStorage.getItem('moneyRaised');
    const savedNeedsSold = localStorage.getItem('needsSold');

    if (savedStats) {
      const stats = JSON.parse(savedStats);
      this.stats = new Map<string, number>(Object.entries(stats))
    }

    if (savedMoneyRaised) {
      this.totalMoneyRaised = Number(JSON.parse(savedMoneyRaised));
    }

    if (savedNeedsSold) {
      this.totalNeedsSold = Number(JSON.parse(savedNeedsSold));
    }
  }

  getTopNeeds(needsMap: Map<string, number>): [string, number][] {
    let needsArray = Array.from(needsMap.entries());
    let soretedNeeds =  needsArray.sort((a,b) => b[1]- a[1]);
    return soretedNeeds.slice(0,3);
  }

}