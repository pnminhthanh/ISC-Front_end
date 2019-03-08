import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

// declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  message = '';
  username = '';
  password = '';
  constructor(private authService: AuthService, private cookieService: CookieService,
              private adminService: AdminService, private router: Router) {}
  // loginFrm(form) {
  //   console.log(form.value);
  // }
  login() {
    this.adminService.login(this.username, this.password)
    .subscribe(result => {
      if (result.errorCode === 1) {
        this.message = result.message;
        // console.log(result, this.message);
      } else {
        this.message = '';
        this.authService.setLoggIn(true);
        // save cookie
        this.cookieService.set('adminid', result.data.adminid + '');
        this.cookieService.set('token', result.data.accessToken);
        this.router.navigate(['/course']);
      }
    });
  }

  ngOnInit() {
  }

}
