import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, delay} from 'rxjs/operators';

import {BASE_API_URL} from '../../../../environments/environment';
import {Injectable} from '@angular/core';
import {EdgesTest, NodesTest} from "../../../shared/models/data";
import {IDropdownEntityState} from "../../../shared/interfaces/common.interface";
import {EADPNetwork} from "../../../shared/interfaces/entity-network.interface";

@Injectable()
export class EntityNetworkService {

  constructor(private http: HttpClient) {
  }

  private baseUrl: string = BASE_API_URL;

  private static handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return throwError(error || 'Server error');
  }

  getNodes(id: string): Observable<any | IDropdownEntityState[]> {
    let apiURL = this.baseUrl + 'entityNetwork/nodes?uri=' + id;
    return this.http.get(apiURL).pipe(catchError(EntityNetworkService.handleError));
  }

  getEntities(): Observable<any> {
    let apiURL = this.baseUrl + 'entityNetwork/entities';
    return this.http.get(apiURL).pipe(catchError(EntityNetworkService.handleError));
  }

  getNetwork(id: string): Observable<any | EADPNetwork> {
    let apiURL = this.baseUrl + 'entityNetwork/relationships?uri=' + id;
    return this.http.get(apiURL).pipe(catchError(EntityNetworkService.handleError));
  }
}
