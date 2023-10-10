import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:9191/v1/driver-onboarding';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class DriverService {

	constructor(private http: HttpClient) {}

	getOnboardingRequests(): Observable<any> {
	  return this.http.get(API_URL + '', httpOptions);
	}

	getUserOnboardingRequest(): Observable<any> {
		return this.http.get(API_URL + '/user', httpOptions);
	}

	postUserOnboardingRequest( data: any ): Observable<any> {
		return this.http.post(API_URL + '/request', data, httpOptions);
	}

	postOnboardingRequestDecision( data: any ): Observable<any> {
		return this.http.post(API_URL + '/update-status', data, httpOptions);
	}
}
