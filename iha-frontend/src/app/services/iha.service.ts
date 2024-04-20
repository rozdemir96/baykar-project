import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, take} from "rxjs";
import {IhaDto} from "../models/IhaDto";

@Injectable({
  providedIn: 'root'
})
export class IhaService {

  constructor(private http: HttpClient) {
  }

  read(): Observable<any> {
   return  this.http.get('http://127.0.0.1:8000/api/ihas').pipe(take(1))
  }

  postIha(iha: IhaDto): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/ihas', iha).pipe(take(1))
  }

  updateIha(iha: IhaDto): Observable<any> {
    return this.http.put('http://127.0.0.1:8000/api/ihas/' + iha.id, iha).pipe(take(1))
  }

  deleteIha(iha: IhaDto): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/api/ihas/' + iha.id).pipe(take(1))
  }
}
