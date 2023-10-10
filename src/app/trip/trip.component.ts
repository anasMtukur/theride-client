import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from '../_services/booking.service';

@Component({
	selector: 'app-trip',
	templateUrl: './trip.component.html',
	styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
	booking?: any = {};
	driverLocations?: any = {};
	pickup?: any = {};
	dropoff?: any = {};
	
	constructor(private bookingService: BookingService) { }
	
	@Input() id!: string;
	ngOnInit(): void {
		console.log( this.id );
		this.loadBooking();
	}

	loadBooking(){
		this.bookingService.getBookingById( this.id, "trip" ).subscribe({
			next: data => {
				this.booking = data.booking;
				this.driverLocations = data.drivers;
				this.pickup = data.booking.points.find( (obj: any) => obj.pointType === "PICKUP");
				this.dropoff = data.booking.points.find( (obj: any) => obj.pointType === "DROPOFF");
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

	updateTripStatus( id: string, status: string ){
		const updateData = {
			id,
			status
		};

		this.bookingService.updateBookingStatus( updateData ).subscribe({
			next: data => {
				this.booking = data;
				this.pickup = data.points.find( (obj: any) => obj.pointType === "PICKUP");
				this.dropoff = data.points.find( (obj: any) => obj.pointType === "DROPOFF");
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
