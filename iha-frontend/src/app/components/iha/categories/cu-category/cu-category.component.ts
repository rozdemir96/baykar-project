import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { take } from "rxjs";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-cu-category",
  templateUrl: "./cu-category.component.html",
  styleUrls: ["./cu-category.component.css"],
})
export class CuCategoryComponent implements OnInit {
  updatemode: boolean = false;

  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
  });

  constructor(
    private categoryService: CategoryService,
    private ddref: DynamicDialogRef,
    private conf: DynamicDialogConfig
  ) {
    if (this.conf.data) {
      this.form.patchValue(this.conf.data.category);
      this.updatemode = true;
    }
  }

  ngOnInit(): void {}

  submit() {
    if (this.updatemode) {
      this.categoryService
        .update(this.form.value)
        .pipe(take(1))
        .subscribe((res: any) => {
          console.log(res);
          this.ddref.close(res);
        });
    } else {
      this.categoryService
        .create(this.form.value)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res);
          this.ddref.close(res);
        });
    }
  }
}
