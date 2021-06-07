import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

const API = 'http://localhost:3333/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { name, email, password } = {
      name: this.user.value.name,
      email: this.user.value.email,
      password: this.user.value.password,
    };

    this.http
      .post(
        API + 'users',
        {
          name,
          email,
          password,
        },
        httpOptions
      )
      .subscribe((data) => {
        this.router.navigateByUrl('/');
      });
  }
}
