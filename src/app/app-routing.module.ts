import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { DriverMainComponent } from './driver-main/driver-main.component';
import { UserMainComponent } from './user-main/user-main.component';
import { BookingComponent } from './booking/booking.component';
import { BecomeDriverComponent } from './become-driver/become-driver.component';
import { TripComponent } from './trip/trip.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'user', component: UserMainComponent },
	{ path: 'driver', component: DriverMainComponent },
	{ path: 'admin', component: AdminBoardComponent },
	{ path: 'booking/:id', component: BookingComponent },
	{ path: 'become-driver', component: BecomeDriverComponent },
	{ path: 'trip/:id', component: TripComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
	bindToComponentInputs: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
