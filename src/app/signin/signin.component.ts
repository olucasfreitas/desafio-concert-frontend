import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API = 'http://localhost:3333/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { email, password } = this.form;
    console.log(email, password);

    const response = this.http
      .post(
        API + 'sessions',
        {
          email,
          password,
        },
        httpOptions
      )
      .subscribe((resp) => {
        console.log(resp);
      });

    console.log(response);
    this.router.navigateByUrl('/chart');
  }
}
