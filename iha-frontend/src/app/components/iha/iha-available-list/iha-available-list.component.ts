import { Component, OnInit } from "@angular/core";
import { IhaDto } from "../../../models/IhaDto";
import { IhaService } from "../../../services/iha.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DialogService } from "primeng/dynamicdialog";
import { CreateUpdateIhaComponent } from "../create-update-iha/create-update-iha.component";
import { forkJoin, take } from "rxjs";
import { IhaRentalsService } from "src/app/services/iha-rentals.service";
import { IhaRentalDto } from "src/app/models/IhaRentalDto";
import { RentComponent } from "./rent.component";
import { Category, CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-iha-available-list",
  templateUrl: "./iha-available-list.component.html",
  styleUrls: ["./iha-available-list.component.css"],
})
export class IhaAvailableListComponent implements OnInit {
  availableIhaList: IhaDto[] = [];
  rentalList: IhaRentalDto[] = [];
  categories: Category[] = [];
  ihaCreateForm!: FormGroup;
  ihaUpdateForm!: FormGroup;
  userId = "";

  constructor(
    private formBuilder: FormBuilder,
    private ihaService: IhaService,
    public dialogService: DialogService,
    private ihaRentalsService: IhaRentalsService,
    private categoryService: CategoryService
  ) {
    this.ihaCreateForm = this.formBuilder.group({
      marka: [],
      model: [],
      agirlik: [],
      kategori: [],
    });
    this.ihaUpdateForm = this.formBuilder.group({
      id: [],
      marka: [],
      model: [],
      agirlik: [],
      kategori: [],
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem("user") + "";
    this.fetch();
  }

  fetch() {
    forkJoin({
      ihas: this.ihaService.read(),
      rent: this.ihaRentalsService.read(),
      categories: this.categoryService.read(),
    }).subscribe((res) => {
      this.availableIhaList = res.ihas;
      this.rentalList = res.rent;
      this.categories = res.categories;
      console.log(res);
    });
  }

  createIha() {
    const ref = this.dialogService.open(CreateUpdateIhaComponent, {
      width: "70%",
      closable: true,
    });

    ref.onClose.subscribe({
      next: (res) => {
        this.fetch();
        // if (res) this.availableIhaList.push(res);
      },
    });
  }

  updateIha(iha: any) {
    const ref = this.dialogService.open(CreateUpdateIhaComponent, {
      width: "70%",
      data: {
        iha,
      },
      closable: true,
    });

    ref.onClose.subscribe({
      next: (res) => {
        const x =
          this.availableIhaList.findIndex((i) => i?.id === res?.id) > -1;
        if (x) {
          this.availableIhaList = this.availableIhaList.map((i) => {
            if (i.id === res.id) {
              return res;
            }
            return i;
          });
        }
      },
    });
  }

  deleteIha(iha: IhaDto) {
    var result = confirm("Want to delete?");
    if (result) {
      this.ihaService.deleteIha(iha).subscribe((data) => {
        this.fetch();
      });
    }
  }

  getRentInfo(iha: IhaDto) {
    return this.rentalList.find(
      (r) => r.user == this.userId && r.iha == iha.id
    );
  }

  rent(iha: IhaDto) {
    const rentedIha = this.rentalList.find(
      (r) => r.user == this.userId && r.iha == iha.id
    );

    if (rentedIha) {
      this.ihaRentalsService.deleteIha(rentedIha.id).pipe(take(1)).subscribe();
      this.rentalList = this.rentalList.filter((r) => r.id !== rentedIha.id);
    } else {
      const ref = this.dialogService.open(RentComponent, {
        header: "Select Date",
        width: "70%",
        height: "90%",
        closable: true,
      });
      ref.onClose.pipe(take(1)).subscribe((r) => {
        console.log(r);
        this.ihaRentalsService
          .postIha({
            iha: iha.id,
            user: this.userId,
            start_date: r.startDate,
            end_date: r.endDate,
          } as IhaRentalDto)
          .pipe(take(1))
          .subscribe((res) => {
            console.log(res);
            this.rentalList.push(res);
            console.log(this.rentalList);
          });
      });
    }
  }

  isrented(iha: IhaDto) {
    const isrented =
      this.rentalList.findIndex(
        (r) => r.user == this.userId && r.iha == iha.id
      ) > -1;
    return isrented;
  }

  getCategoryName(id: any) {
    return this.categories.find((c) => c.id == id)?.name;
  }
}
