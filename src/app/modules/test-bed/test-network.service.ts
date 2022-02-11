import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

import {BASE_API_URL} from '../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class TestNetworkService {

  constructor(private http: HttpClient) {
  }

  private baseUrl: string = BASE_API_URL;

  private static handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return throwError(error || 'Server error');
  }

  getEntities(): Observable<any> {
    let apiURL = this.baseUrl + 'network';
    return this.http.get(apiURL).pipe(catchError(TestNetworkService.handleError));
  }
}
