import { Component, OnInit } from '@angular/core';
import { DriverService } from '../_services/driver.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent  implements OnInit {
	awatingRequests: any[] = [];
	decisionOpts: string[] = ["APPROVED", "DENIED"]
	openModalId: string = "";
	selectedDecision: string = "";
	modalDisplay = "none";

	decisionUpdateSuccess: boolean = false;
	decisionUpdateFailed: boolean = false;
	descisionUpdateError: string|undefined = undefined;

	constructor(private driverService: DriverService, private storageService: StorageService) { }

	ngOnInit(): void {
		this.driverService.getOnboardingRequests().subscribe({
			next: data => {
				this.awatingRequests = data.items;
				console.log(this.awatingRequests)
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

	openModal( id: string ){
		console.log( id );
		this.openModalId = id;
		this.modalDisplay = "block";
	}

	onCloseHandled() {
		this.modalDisplay = "none";
		this.openModalId = "";
	}

	changeCity(e: any) {
		this.selectedDecision = e.target.value;
		console.log( this.selectedDecision );
	}

	postUpdateStatus(){
		const data = {
			"driverId": this.openModalId,
			"status": this.selectedDecision
		}

		console.log( data );
		this.driverService.postOnboardingRequestDecision( data ).subscribe({
			next: data => {
				let oldIndex = this.awatingRequests.findIndex( (obj:any) => obj.id = data.id );
				this.awatingRequests[oldIndex] = data;
	  
				this.decisionUpdateFailed = false;
				this.decisionUpdateSuccess = true;

				this.openModalId = "";
				this.onCloseHandled();

				window.location.reload();
			},
			error: err => {
				this.descisionUpdateError = err.error.message;
				this.decisionUpdateFailed = false;
				this.decisionUpdateSuccess = true;
			}
		});
	}
}
