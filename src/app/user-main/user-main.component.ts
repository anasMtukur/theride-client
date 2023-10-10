import { Component, OnInit } from '@angular/core';
import { BookingService } from '../_services/booking.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit{
	currentUser: any;
	recentBookings: any;
	constructor(private bookingService: BookingService, private storageService: StorageService) { }

	display = "none";
	formData: any = {
		pickupLatitude: 11.995885573776459,
    	pickupLongitude: 8.579966238990792,
    	dropOffLatitude: 11.995917057410239,
    	dropOffLongitude: 8.579934052482209,
    	bookingType: "GO"
	};

	ngOnInit(): void {
		this.currentUser = this.storageService.getUser();
		this.currentUser.roles = this.currentUser.authorities.map( (obj: { authority: any; }) => obj.authority );
	}

	openModal() {
		this.display = "block";
	}
	onCloseHandled() {
		this.display = "none";
	}

	confirmBooking() {
		console.log( "Confirm booking" );
		
		var newBooking = 0;
		this.bookingService.postBooking( this.formData ).subscribe({
			next: data => {
				newBooking = data.id;
				this.display = "none";
				window.location.replace(`/booking/${newBooking}`);
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
