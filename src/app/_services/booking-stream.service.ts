import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpHeaders,
} from '@angular/common/http'; 
import { BehaviorSubject } from 'rxjs';
import { BookingService } from './booking.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
@Injectable({
  providedIn: 'root'
})
export class BookingStreamService {
	private httpOptions = {
		headers: new HttpHeaders({
		'Content-Type': 'application/json'
		})
	};
	headers = new HttpHeaders().set('Content-Type', 'application/json');
  	
	private _dataModel: BehaviorSubject<any> = new BehaviorSubject<any>({});
  	private dataStore: { data: any } = { data: {} };
  	readonly dataModel = this._dataModel.asObservable();
	
	constructor( private http: HttpClient, private bookingService: BookingService ) {
		this.getExistingBookings();

		this.streamIncomingBookings();
	 }

	getExistingBookings(){
		const locationData: any = {
			latitude: 11.995666751321636,
			longitude: 8.579936027526855
		};

		this.bookingService.fetchBookingsInZone( locationData ).subscribe({
			next: data => {
				data.forEach( (element: any) => {
					
					element.readable = element.points[1]?.address;
					
				});
				this.dataStore.data = data;
      			this._dataModel.next(Object.assign({}, this.dataStore).data);
			},
			error: err => {console.log(err)
				if (err.error) {
					console.log( JSON.parse(err.error).message );
				} else {
					console.log( "Error with status: " + err.status );
				}
			}			
		});
	}

	streamURL: string = 'http://localhost:9191/websocket';
  	client: any;
  	streamMessage: any;
	
	streamIncomingBookings(){
		let ws = new SockJS(this.streamURL);
		this.client = Stomp.over(ws);
		let that = this;
		
		this.client.connect({}, function(frame:any) {
			console.log('Connected: ' + frame);
            
			that.client.subscribe('/incoming-bookings', ( message:any ) => {
				if(message.body) {
					that.streamMessage = message.body;
					const newBooking = JSON.parse(that.streamMessage);
					newBooking.readable = newBooking.points[1]?.address;
					that.dataStore.data = newBooking;
					that._dataModel.next(Object.assign({}, that.dataStore).data);
				}
			});
		});
  	}   
}
