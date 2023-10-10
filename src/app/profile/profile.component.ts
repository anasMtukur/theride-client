import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
	currentUser: any;
	recentBookings: any;
	roles: string[] = [];

	constructor(private storageService: StorageService) { }

	ngOnInit(): void {
		this.currentUser = this.storageService.getUser();
		this.currentUser.roles = this.currentUser.authorities.map( (obj: { authority: any; }) => obj.authority );
	}
}
