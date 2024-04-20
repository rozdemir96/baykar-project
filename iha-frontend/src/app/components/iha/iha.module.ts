import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IhaAvailableListComponent } from "./iha-available-list/iha-available-list.component";
import { IhaRentedListComponent } from "./iha-rented-list/iha-rented-list.component";
import { AppRoutingModule } from "../../app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { CreateUpdateIhaComponent } from "./create-update-iha/create-update-iha.component";
import { RentComponent } from "./iha-available-list/rent.component";
import { CalendarModule } from "primeng/calendar";
import { CategoriesComponent } from "./categories/categories.component";
import { CuCategoryComponent } from "./categories/cu-category/cu-category.component";
import { DropdownModule } from "primeng/dropdown";

@NgModule({
  declarations: [
    IhaAvailableListComponent,
    IhaRentedListComponent,
    CreateUpdateIhaComponent,
    RentComponent,
    CategoriesComponent,
    CuCategoryComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    DynamicDialogModule,
    CalendarModule,
    DropdownModule,
  ],
  providers: [DialogService],
})
export class IhaModule {}
