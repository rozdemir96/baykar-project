import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";

export interface Category {
  id: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  read(): Observable<Category[]> {
    return this.http
      .get<Category[]>("http://127.0.0.1:8000/api/categories")
      .pipe(take(1));
  }

  create(Category: Category): Observable<Category> {
    return this.http
      .post<Category>("http://127.0.0.1:8000/api/categories", Category)
      .pipe(take(1));
  }

  update(category: Category): any {
    return this.http
      .put<Category>(
        "http://127.0.0.1:8000/api/categories/" + category.id,
        category
      )
      .pipe(take(1));
  }

  // updateIha(ihaRental: IhaRentalDto): Observable<any> {
  //   // return this.http.put('http://127.0.0.1:8000/api/rentals/' + ihaRental.id, {user: ihaRental.user, iha: ihaRental.iha, start_date: ihaRental.start_date, end_date: ihaRental.end_date} as IhaRentalDto).pipe(take(1))
  // }

  delete(categoryId: string): Observable<any> {
    return this.http
      .delete("http://127.0.0.1:8000/api/categories/" + categoryId)
      .pipe(take(1));
  }
}
