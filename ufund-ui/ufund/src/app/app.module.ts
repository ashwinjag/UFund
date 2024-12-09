import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NeedComponent } from './need/need.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { AdminSearchComponent } from './admin-search/admin-search.component';
import { CartComponent } from './cart/cart.component';
import { AdminAddRemoveComponent } from './admin-add-remove/admin-add-remove.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { AdminMessagesComponent } from './admin-messages/admin-messages.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NeedComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    UserSearchComponent,
    AdminSearchComponent,
    CartComponent,
    AdminAddRemoveComponent,
    UserMessagesComponent,
    AdminMessagesComponent,
    UserDetailComponent,
    AdminDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
