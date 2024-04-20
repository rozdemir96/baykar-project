import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {IhaAvailableListComponent} from "./components/iha/iha-available-list/iha-available-list.component";
import {IhaRentedListComponent} from "./components/iha/iha-rented-list/iha-rented-list.component";
import {SignUpComponent} from "./components/login/sign-up/sign-up.component";

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'iha-available-list', component: IhaAvailableListComponent},
  { path: 'iha-rented-list', component: IhaRentedListComponent},
  { path: 'sign-up', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
