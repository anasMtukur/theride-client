import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { DriverMainComponent } from './driver-main/driver-main.component';
import { UserMainComponent } from './user-main/user-main.component';
import { BookingComponent } from './booking/booking.component';
import { BecomeDriverComponent } from './become-driver/become-driver.component';
import { TripComponent } from './trip/trip.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AdminBoardComponent,
    DriverMainComponent,
    UserMainComponent,
    BookingComponent,
    BecomeDriverComponent,
    TripComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
	GoogleMapsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
