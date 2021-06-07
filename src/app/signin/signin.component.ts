import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

const API = 'http://localhost:3333/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

interface User {
  user: Object;
  token: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { email, password } = {
      email: this.login.value.email,
      password: this.login.value.password,
    };

    this.http
      .post(
        API + 'sessions',
        {
          email,
          password,
        },
        httpOptions
      )
      .subscribe((data) => {
        const tranformedData = data as User;
        this.cookieService.set('token', tranformedData.token);
        this.router.navigateByUrl('/chart');
      });
  }
}
