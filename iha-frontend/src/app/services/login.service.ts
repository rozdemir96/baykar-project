import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginDto } from "../models/LoginDto";
import { BehaviorSubject, Observable, Subject, take } from "rxjs";
import { SignUpDto } from "../models/SignUpDto";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  user = new Subject<SignUpDto>();
  constructor(private http: HttpClient) {}

  login(loginDto: LoginDto): Observable<any> {
    return this.http
      .post("http://127.0.0.1:8000/login", loginDto)
      .pipe(take(1));
  }
}
