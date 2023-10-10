import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:9191/v1/booking/';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
	constructor(private http: HttpClient) {}

	postBooking( data: any ): Observable<any> {
		return this.http.post(API_URL + '', data, { responseType: 'json' });
	}

	getBookingById( id: string, mode: string = "booking" ): Observable<any> {
		return this.http.get(API_URL + mode + "/" + id, { responseType: 'json' });
	}

	fetchBookingsInZone( data: any ): Observable<any> {
		return this.http.post(API_URL + 'zone', data, { responseType: 'json' });
	}

	updateBookingStatus( data: any ): Observable<any> {
		return this.http.put(API_URL + 'status', data, { responseType: 'json' });
	}
}
