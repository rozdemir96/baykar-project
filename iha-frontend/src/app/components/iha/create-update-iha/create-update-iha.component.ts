import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  DynamicDialogRef,
  DynamicDialogConfig,
  DialogService,
} from "primeng/dynamicdialog";
import { IhaDto } from "src/app/models/IhaDto";
import { IhaService } from "src/app/services/iha.service";
import { CategoriesComponent } from "../categories/categories.component";
import { Category, CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-create-update-iha",
  templateUrl: "./create-update-iha.component.html",
  styleUrls: ["./create-update-iha.component.css"],
})
export class CreateUpdateIhaComponent implements OnInit {
  iha: any;
  updatemode: boolean = false;
  categories: Category[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    weight: new FormControl("", Validators.required),
    category: new FormControl("", Validators.required),
    brand: new FormControl("", Validators.required),
    model: new FormControl("", Validators.required),
    max_flight_time: new FormControl("", Validators.required),
    max_range: new FormControl("", Validators.required),
    battery_capacity: new FormControl("", Validators.required),
  });

  constructor(
    private ihaService: IhaService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private dialogService: DialogService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetch();

    if (this.config.data) {
      this.updatemode = true;
      this.iha = this.config.data.iha;
      this.form.patchValue(this.iha);
    }
  }

  fetch() {
    this.categoryService.read().subscribe((res) => {
      this.categories = res;
    });
  }

  submit() {
    console.log(this.form.get('category')?.value);
    if (this.updatemode) {
      this.ihaService.updateIha(this.form.value).subscribe((data) => {
        console.log(data);
        this.ref.close(data);
      });
    } else {
      this.ihaService.postIha(this.form.value).subscribe((data) => {
        this.ref.close(data);
      });
    }
  }

  showCategories() {
    const ref = this.dialogService.open(CategoriesComponent, {
      width: "70%",
      height: "90%",
      closable: true,
    });
  }
}
