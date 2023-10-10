import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from '../_services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
	booking?: any = {};
	driverLocations?: any[] = [];
	pickup?: any = {};
	dropoff?: any = {};
	interval: any;
	
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

	markers: any[] = [];
	
	constructor(private bookingService: BookingService) { }
	
	@Input() id!: string;
	ngOnInit(): void {
		console.log( this.id );
		/* navigator.geolocation.getCurrentPosition((position) => {
			this.center = {
			  lat: position.coords.latitude,
			  lng: position.coords.longitude,
			};
			console.log( this.center );
		}); */
		this.loadBooking();

		this.interval = setInterval(() => {
			this.loadBooking();
		}, 9000);

	}

	loadBooking(){
		this.bookingService.getBookingById( this.id ).subscribe({
			next: data => {
				this.booking = data.booking;
				this.driverLocations = data.drivers;

				this.pickup = data.booking.points.find( (obj: any) => obj.pointType === "PICKUP");
				this.dropoff = data.booking.points.find( (obj: any) => obj.pointType === "DROPOFF");

				this.center = { lat: Number(this.pickup?.latitude), lng: Number(this.pickup?.longitude) };
				const centerMarker = { position: this.center, title: "You are here", label: "You are here" };
				this.markers.push(centerMarker);

				let markerOptions: { 
					animation: google.maps.Animation.BOUNCE,
					icon:{
						url: "https://cdn.iconscout.com/icon/premium/png-128-thumb/car-pointer-1106857.png"
					}
				}
				this.driverLocations?.forEach(element => {
					let color = this.getColor( element.distance )
					this.markers.push({
						position: { lat: Number(element.location?.latitude), lng: Number(element.location?.longitude) },
						title: `${element.driver?.firstName} ${element.driver?.lastName}`, 
						label: {color: color, text: `${element.distance}m`}, 
						options: markerOptions
					});
				});

				if( this.interval !== null && (data.booking.driver || data.booking.bookingStatus !== "ASSIGNING_DRIVER") ){
					clearInterval(this.interval);
					console.log("Interval stopped");
					this.interval = null;
				}
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

	cancelBooking(){
		console.log( "Cancel Booking" );
	}

	getColor( distance: number ){
		if( distance < 500 ) return 'green'
		if( distance > 500 && distance < 1500 ) return 'blue'
		if( distance > 1500 && distance < 2500 ) return 'pink'
		if( distance > 2500 && distance < 5000 ) return 'orange'
		return 'red';
	}

}
