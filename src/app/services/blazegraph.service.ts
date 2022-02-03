import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BlazegraphService {
  private responseData$ :Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  requestData() {
    let url = environment.apiURL + environment.apiEndPoint;
    this.httpClient.get<any>(url).subscribe( data => {
      console.dir(data);
      this.responseData$.next(data);
    });
  }

  getResponseData(){
    return this.responseData$.asObservable();
  }
}
