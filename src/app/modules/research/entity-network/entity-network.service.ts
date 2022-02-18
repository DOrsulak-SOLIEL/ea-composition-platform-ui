import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, delay} from 'rxjs/operators';

import {BASE_API_URL} from '../../../../environments/environment';
import {Injectable} from '@angular/core';
import {EdgesTest, NodesTest} from "../../../shared/models/data";

@Injectable()
export class EntityNetworkService {

  constructor(private http: HttpClient) {
  }

  private baseUrl: string = BASE_API_URL;

  private static handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return throwError(error || 'Server error');
  }

  getNodes(id: string): Observable<any> {
    let apiURL = this.baseUrl + 'entityNetwork/nodes?uri=' + id;
    console.log(id);
    return this.http.get(apiURL).pipe(catchError(EntityNetworkService.handleError));
    /*    const nodes = [
          {
            "id": "https://www.google.com/url?q=http://eadp.kg.local/ns/eadp/entity/Capability/123&source=gmail-imap&ust=1644931764000000&usg=AOvVaw24JoTwaOhdR9cCwUNU8-0x",
            "name": "gddfgf",
          },
          {
            "id": "https://www.google.com/url?q=http://eadp.kg.local/ns/eadp/entity/Capability/456&source=gmail-imap&ust=1644931764000000&usg=AOvVaw1hYJfY0IDE9F3VOB1N_H3r",
            "name": "dfgdfgdfg",
          }
        ];
        return of(nodes);*/
  }

  getEntities(): Observable<any> {
    let apiURL = this.baseUrl + 'entityNetwork/entities';
    return this.http.get(apiURL).pipe(catchError(EntityNetworkService.handleError));
    /*    const entities = [{
          id: 'https://www.google.com/url?q=http://eadp.kg.local/ns/eadp/entity/Capability&source=gmail-imap&ust=1644931764000000&usg=AOvVaw30g_VmlUhyLzeFjpzmnTpd',
          name: "Capability"
        },
          {
            id: 'https://www.google.com/url?q=http://eadp.kg.local/ns/eadp/entity/System&source=gmail-imap&ust=1644931764000000&usg=AOvVaw2-RlXGgUukFT7E5mQoCum7',
            name: "System"
          },
          {
            id: 'https://www.google.com/url?q=http://eadp.kg.local/ns/eadp/entity/Service&source=gmail-imap&ust=1644931764000000&usg=AOvVaw2hJlaXm1hAWQtf49hgWhma',
            name: "Service"
          }
        ];
        return of(entities);*/
  }

  getNetwork(id: string) {
    let apiURL = this.baseUrl + 'entityNetwork/relationships?uri=' + id;
    return this.http.get(apiURL).pipe(catchError(EntityNetworkService.handleError));
/*    const network = {
      nodes: NodesTest,
      edges: EdgesTest
    };
    return of(network);*/
  }
}

/*
  edge:
  from: testName,
    to: "Project 1",
  relation: "owns",
  label: 'owns',
  arrows: "to, from",
  color: {color: "red"},
},*/
