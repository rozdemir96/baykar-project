import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {IhaDto} from "../models/IhaDto";
import {IhaRentalDto} from "../models/IhaRentalDto";

@Injectable({
  providedIn: 'root'
})
export class IhaRentalsService {

  constructor(private http: HttpClient) {

  }

  read(): Observable<any> {
    return  this.http.get('http://127.0.0.1:8000/api/rentals').pipe(take(1))
  }

  postIha(ihaRental: IhaRentalDto): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/rentals', ihaRental).pipe(take(1))
  }

  // updateIha(ihaRental: IhaRentalDto): Observable<any> {
  //   // return this.http.put('http://127.0.0.1:8000/api/rentals/' + ihaRental.id, {user: ihaRental.user, iha: ihaRental.iha, start_date: ihaRental.start_date, end_date: ihaRental.end_date} as IhaRentalDto).pipe(take(1))
  // }

  deleteIha(ihaRentalId : string): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/api/rentals/' + ihaRentalId).pipe(take(1))
  }
}
