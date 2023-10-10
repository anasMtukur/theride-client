import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../_services/storage.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
	constructor(private storageService: StorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	const bearerToken = this.storageService.getToken();

    req = req.clone({
      withCredentials: true,
	  setHeaders: {
        Authorization: `Bearer ${bearerToken}`
      }
    });

    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
