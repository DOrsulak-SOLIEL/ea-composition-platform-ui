import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {testAPIResponse} from "../models/data";
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlazegraphService {
  private responseData$ :Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  requestData() {
    let url = environment.apiURL + environment.apiEndPoint + '?nodeId=3844';
    this.httpClient.get<any>(url).subscribe( data => {
      console.dir(data);
      this.responseData$.next(data);
    });
  }

  getResponseData(){
    return this.responseData$.asObservable();
  }

  getAPIMock() : Observable<any> {
    return of(testAPIResponse);
  }
}
