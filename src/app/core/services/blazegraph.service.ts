import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_API_URL} from "../../../environments/environment";
import {testAPIResponse} from "../../shared/models/data";
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlazegraphService {
  private responseData$ :Subject<any> = new Subject<any>();
  private baseUrl: string = BASE_API_URL;

  constructor(private httpClient: HttpClient) { }

  requestData() {
    let url = this.baseUrl + '/api/node?nodeId=3844';
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
