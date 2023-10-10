import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	form: any = {
		firstName: null,
		lastName: null,
		email: null,
		mobile: null,
	  	password: null
	};
	isSuccessful = false;
	isSignUpFailed = false;
	errorMessage = '';
  
	constructor(private authService: AuthService) { }
  
	ngOnInit(): void {
	}
  
	onSubmit(): void {
	  const { firstName, lastName, email, mobile, password } = this.form;
  
	  this.authService.register( firstName, lastName, email, mobile, password ).subscribe({
		next: data => {
		  console.log(data);
		  this.isSuccessful = true;
		  this.isSignUpFailed = false;

		  window.location.replace("/login")
		},
		error: err => {
		  this.errorMessage = err.error.message;
		  this.isSignUpFailed = true;
		}
	  });

	  
	}
}