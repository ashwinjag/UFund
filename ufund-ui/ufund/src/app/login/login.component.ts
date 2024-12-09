import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../auth.service';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    

    this.authService.getUsers().subscribe((users: User[]) => {
      const isValid = this.authService.validateLogin(username, password, users);

      if (isValid) {
        const validUser = this.authService.getLoginData().user;
        if(validUser != undefined && !validUser.isAdmin){
          this.router.navigateByUrl('/user-dashboard');
        }
        else if(validUser != undefined && validUser.isAdmin){
          this.router.navigateByUrl('/admin-dashboard');
        }
      } else {
        alert('Invalid username or password');
      }
    });

    console.log(this.authService.getLoginData());
  }
}
