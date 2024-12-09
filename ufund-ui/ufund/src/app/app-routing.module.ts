import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NeedComponent } from './need/need.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAddRemoveComponent } from './admin-add-remove/admin-add-remove.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'user-dashboard', component: UserDashboardComponent},
  {path: 'user-detail/:id', component: UserDetailComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent},
  {path: 'admin-addremove', component: AdminAddRemoveComponent},
  {path: 'need', component: NeedComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
