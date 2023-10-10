import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
	form: any = {
	  username: null,
	  password: null
	};
	isLoggedIn = false;
	isLoginFailed = false;
	errorMessage = '';
	roles: string[] = [];
  
	constructor(private authService: AuthService, private storageService: StorageService) { }
  
	ngOnInit(): void {
	  if (this.storageService.isLoggedIn()) {
		this.isLoggedIn = true;
		this.roles = this.storageService.getUser().authorities.map( (obj: { authority: any; }) => obj.authority );
	  }
	}
  
	onSubmit(): void {
	  const { username, password } = this.form;
  
	  this.authService.login(username, password).subscribe({
		next: data => {
			this.storageService.saveUser(data.user);
			this.storageService.saveToken(data.jwttoken);
  
		  this.isLoginFailed = false;
		  this.isLoggedIn = true;
		  const user = this.storageService.getUser();
		  this.roles = user.authorities.map( (obj: { authority: any; }) => obj.authority );
		  
		  this.goHome();
		},
		error: err => {
		  this.errorMessage = err.error.message;
		  this.isLoginFailed = true;
		}
	  });
	}
  
	reloadPage(): void {
	  window.location.reload();
	}

	goHome(): void {
		if( this.roles.includes( "ADMIN" ) ){
			window.location.replace("/admin");
			return;
		}

		if( this.roles.includes( "DRIVER" ) ){
			window.location.replace("/driver");
			return;
		}

		window.location.replace("/user");
	}
}