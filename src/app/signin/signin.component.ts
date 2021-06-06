import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    console.warn(this.login.value);

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
        localStorage.setItem('token', tranformedData.token);
        this.router.navigateByUrl('/chart');
      });
  }
}
