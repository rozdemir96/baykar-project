import { Component, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { take } from "rxjs";
import { Category, CategoryService } from "src/app/services/category.service";
import { CuCategoryComponent } from "./cu-category/cu-category.component";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.categoryService
      .read()
      .pipe(take(1))
      .subscribe((res) => {
        this.categories = res;
      });
  }

  addCategory() {
    const ref = this.dialogService.open(CuCategoryComponent, {
      width: "50%",
    });

    ref.onClose.subscribe((r) => {
      this.fetch();
    });
  }

  update(category: Category) {
    const ref = this.dialogService.open(CuCategoryComponent, {
      width: "50%",
      data: {
        category,
      },
    });

    ref.onClose.subscribe((r) => {
      this.fetch();
    });
  }

  deleteCategory(category: Category) {
    var result = confirm("Want to delete?");
    if (result) {
      this.categoryService.delete(category.id).subscribe((data) => {
        console.log(data);
        this.fetch();
      });
    }
  }
}
