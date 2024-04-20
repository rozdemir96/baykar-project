import { Component, OnInit } from "@angular/core";
import { IhaRentalsService } from "../../../services/iha-rentals.service";
import { IhaDto } from "../../../models/IhaDto";
import { LoginService } from "../../../services/login.service";
import { SignUpDto } from "../../../models/SignUpDto";
import { take } from "rxjs";
import { IhaRentalDto } from "../../../models/IhaRentalDto";
import { IhaService } from "../../../services/iha.service";

@Component({
  selector: "app-iha-rented-list",
  templateUrl: "./iha-rented-list.component.html",
  styleUrls: ["./iha-rented-list.component.css"],
})
export class IhaRentedListComponent implements OnInit {
  allIhas: IhaDto[] = [];
  rentedIhas: IhaRentalDto[] = [];
  userId!: string;
  constructor(
    private loginService: LoginService,
    private ihaRentalsService: IhaRentalsService,
    private ihaService: IhaService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem("user") + "";
    this.fetch();
  }
  fetch() {
    this.ihaService.read().subscribe((data) => {
      this.allIhas = data;
    });
    this.ihaRentalsService.read().subscribe((data) => {
      this.rentedIhas = data;
    });
  }

  rent(iha: IhaDto) {
    // this.ihaRentalsService
    //   .postIha({
    //     iha: iha.id,
    //     user: this.userId,
    //     start_date: new Date(),
    //     end_date: new Date(),
    //   } as IhaRentalDto)
    //   .subscribe((data) => {
    //     this.fetch();
    //   });
  }

  delete(ihaRentalId: string) {
    this.ihaRentalsService.deleteIha(ihaRentalId).subscribe((data) => {
      this.fetch();
    });
  }
}
