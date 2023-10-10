import { Component, OnInit } from '@angular/core';
import { BookingService } from '../_services/booking.service';
import { StorageService } from '../_services/storage.service';
import { BookingStreamService } from '../_services/booking-stream.service';

@Component({
  selector: 'app-driver-main',
  templateUrl: './driver-main.component.html',
  styleUrls: ['./driver-main.component.css']
})
export class DriverMainComponent implements OnInit{
	currentUser: any;
	bookings: any[] = [];
	mytrips: any[]  = [];
	constructor(private bookingStreamService: BookingStreamService, private bookingService: BookingService, private storageService: StorageService) { }

	ngOnInit(): void {
		this.currentUser = this.storageService.getUser();
		this.currentUser.roles = this.currentUser.authorities.map( (obj: { authority: any; }) => obj.authority );		

		this.bookingStreamService.dataModel.subscribe( p => {
			if(p && this.isIterable( p )){       
				this.bookings = p;
			}else if( p && !this.isIterable( p ) && p.passenger ){
				this.bookings.push( p )
			}
		}); 
	}

	isIterable(obj: any) {
		// checks for null and undefined
		if (obj == null) {
		  return false;
		}
		return typeof obj[Symbol.iterator] === 'function';
	}
	
	goToBooking( id: string ){
		window.location.href = `/trip/${id}`;
	}

	acceptBooking( id: string, status: string ){
		const updateData = {
			id,
			status
		};

		this.bookingService.updateBookingStatus( updateData ).subscribe({
			next: data => {
				this.goToBooking( id );
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
	
}
