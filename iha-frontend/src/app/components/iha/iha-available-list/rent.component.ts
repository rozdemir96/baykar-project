import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-rent",
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="mb-3">
        <label class="form-label">Start Date</label>
        <div>
          <p-calendar
            formControlName="startDate"
            dateFormat="dd.mm.yy"
            styleClass="w-100"
          ></p-calendar>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">End Date</label>
        <div>
          <p-calendar
            formControlName="endDate"
            dateFormat="dd.mm.yy"
            styleClass="w-100"
          ></p-calendar>
        </div>
      </div>
      <button
        class="btn btn-primary w-100"
        [disabled]="form.invalid"
        type="submit"
      >
        Select
      </button>
    </form>
  `,
})
export class RentComponent implements OnInit {
  form = new FormGroup({
    startDate: new FormControl("", Validators.required),
    endDate: new FormControl("", Validators.required),
  });
  constructor(private ref: DynamicDialogRef) {}

  ngOnInit(): void {}

  submit() {
    if (this.form.get("endDate")?.value <= this.form.get("startDate")?.value) {
      alert("Bitiş tarihi başlangıç tarihinden sonra olmalıdır.");
    } else {
      this.ref.close(this.form.value);
    }
  }
}
