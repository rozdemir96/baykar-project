import { Component, OnInit } from '@angular/core';
import {SignUpService} from "../../../services/sign-up.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService, private router: Router) {
    this.signUpForm = this.formBuilder.group({
      username: [''],
      password: [''],
      first_name: [''],
      last_name: [''],
      email: [''],
    })
  }

  ngOnInit() {
  }

  create()   {
    let signUpDto = this.signUpForm?.value
    console.log(signUpDto)
    this.signUpService.create(signUpDto).subscribe(data => {
      if(data){

        this.router.navigate(['/'])
      }
    })
  }

}
