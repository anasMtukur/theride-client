import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { DriverService } from '../_services/driver.service';

@Component({
  selector: 'app-become-driver',
  templateUrl: './become-driver.component.html',
  styleUrls: ['./become-driver.component.css']
})
export class BecomeDriverComponent  implements OnInit {
	currentUser: any;
	existingRequest: any;
	
	form: any = {
		licenseNumber: null,
		gender: "MALE",
		city: null,
		carColor: "Red",
		carBrand: null,
		carModel: null,
		carPlateNo: null,
		carType: "SEDAN",
	};
	isSuccessful = false;
	isFailed = false;
	errorMessage = '';
  
	constructor(private driverService: DriverService, private storageService: StorageService) { }
  
	ngOnInit(): void {
		this.currentUser = this.storageService.getUser();
		this.currentUser.roles = this.currentUser.authorities.map( (obj: { authority: any; }) => obj.authority );

		this.driverService.getUserOnboardingRequest().subscribe({
			next: data => {
				this.existingRequest = data;
				console.log(this.existingRequest)
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
  
	onSubmit(): void {
	  
		const data = this.form;
		console.log(data);

		this.driverService.postUserOnboardingRequest( data ).subscribe({
			next: data => {
			  console.log(data);
			  this.existingRequest = data;	
			  this.isSuccessful = false;
			},
			error: err => {
			  this.errorMessage = err.error.message;
			  this.isFailed = true;
			}
		});
	  
	}
}