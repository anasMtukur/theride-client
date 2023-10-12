import { Component, OnInit } from '@angular/core';
import { BookingService } from '../_services/booking.service';
import { StorageService } from '../_services/storage.service';
import { GeocodingService } from '../_services/geocoding.service';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit{
	currentUser: any;
	recentBookings: any;
	constructor( 
		private bookingService: BookingService, 
		private storageService: StorageService, 
		private geocodingService: GeocodingService ) { }

	display = "none";
	formData: any = {
		pickupLatitude: 11.995885573776459,
    	pickupLongitude: 8.579966238990792,
    	dropOffLatitude: 11.995917057410239,
    	dropOffLongitude: 8.579934052482209,
		pickupAddress: "Not Selected",
		dropOffAddress: "Not Selected",
    	bookingType: "GO"
	};
	zoom: number = 15;
	center: google.maps.LatLngLiteral = { lat: 11.99571432878347, lng: 8.579954039254257 };
	options: google.maps.MapOptions = {
		zoomControl: false,
		scrollwheel: false,
		disableDoubleClickZoom: true,
		streetViewControl: false,
		fullscreenControl: false,
		mapTypeControl: false, 
		maxZoom: 20,
		minZoom: 8,
	};	
	isBooking: boolean = false;
	modalfor: string = "pickup";
	private geoCoder: google.maps.Geocoder = new google.maps.Geocoder();

	ngOnInit(): void {
		this.currentUser = this.storageService.getUser();
		this.currentUser.roles = this.currentUser.authorities.map( (obj: { authority: any; }) => obj.authority );
		this.loadRecentBookings();
	}

	openModal( modalfor: string = "pickup" ) {
		this.display = "block";
		this.modalfor = modalfor;
	}

	onCloseHandled() {
		this.display = "none";
	}

	onBookingStart() {
		this.isBooking = true;
	}

	onBookingCancel() {
		this.isBooking = false;
		this.formData = {
			pickupLatitude: 11.995885573776459,
			pickupLongitude: 8.579966238990792,
			dropOffLatitude: 11.995917057410239,
			dropOffLongitude: 8.579934052482209,
			pickupAddress: "Not Selected",
			dropOffAddress: "Not Selected",
			bookingType: "GO"
		};
	}

	doMapClick(event: google.maps.MapMouseEvent) {
		console.log( event );

		if( event.latLng !== null ){
			const lat: number = event.latLng.lat();
			const lng: number = event.latLng?.lng();
		
			if( this.modalfor === "pickup" ){
				this.formData.pickupLatitude = event.latLng.lat();
				this.formData.pickupLongitude = event.latLng.lng();				
			}

			if( this.modalfor === "destination" ){
				this.formData.dropOffLatitude = event.latLng.lat();
				this.formData.dropOffLongitude = event.latLng.lng();
			}

			this.geocodingService.getReadableLocation( lat, lng )
				.then(( response: string|undefined ) => {
					if( this.modalfor === "pickup" ){
						this.formData.pickupAddress   = response;
					}else{
						this.formData.dropOffAddress   = response;
					}
				}).catch(( error: string|undefined ) => {
					if( this.modalfor === "pickup" ){
						this.formData.pickupAddress   = error;
					}else{
						this.formData.dropOffAddress   = error;
					}
				});
		}

		this.onCloseHandled();
		
	}

	loadRecentBookings(){
		this.bookingService.getBookingHistory().subscribe({
			next: data => {
				data.forEach( (element: any) => {
					
					element.readable = element.points[1]?.address;
					
				});
				this.recentBookings = data;
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
	
	goToBooking( id: string ){
		window.location.replace(`/booking/${id}`);
	}
}
