import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { AppStorageService } from '../services/storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storageService: AppStorageService) {}

  intercept(
    req: HttpRequest<Request>,
    next: HttpHandler,
    // tslint:disable-next-line:no-any
  ): Observable<HttpEvent<any>> {
    // console.log('interceptor adding auth...');
/*    req = req.clone({
      setHeaders: {
        Authorization: `Basic ${this.storageService.getItem(this.storageService.token)}`,
      },
    });*/
    return next.handle(req);
  }
}
