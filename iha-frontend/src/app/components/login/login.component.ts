import { Component, OnInit } from "@angular/core";
import { LoginDto } from "../../models/LoginDto";
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.loginService
      .login({ username: this.username, password: this.password })
      .subscribe((data) => {
        localStorage.setItem("user", data.user.id);
        console.log(data);
        if (data) {
          this.router.navigate(["iha-available-list"]);
        }
      });
  }
}
