import { Injectable } from "@angular/core";
import { SignUpDto } from "../models/SignUpDto";
import { HttpClient } from "@angular/common/http";
import { Observable, take } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  create(signUpDto: SignUpDto): Observable<any> {
    return this.http
      .post("http://127.0.0.1:8000/signup", signUpDto)
      .pipe(take(1));
  }
}
