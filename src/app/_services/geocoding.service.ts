import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeocoderResponse } from '../models/geocoder-response.model';
import { Observable } from 'rxjs';

const key:string = "AIzaSyBQwsnUKPXUEwcEJ_a35Wteizh1vReQ5E4";

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  constructor(private http: HttpClient) {}

  geocodeLatLng(location: google.maps.LatLngLiteral): Promise<GeocoderResponse> {
    let geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ 'location': location }, (results, status) => {
        const response = new GeocoderResponse(status, results);
        resolve(response);
      });
    });
  }

  getLocation(term: string): Observable<GeocoderResponse> {
    const url = `https://maps.google.com/maps/api/geocode/json?address=${term}&sensor=false&key=${key}`;
    return this.http.get<GeocoderResponse>(url);
  }

  getReadableLocation( lat: number, lng: number ) : Promise< string|undefined >{
	let geocoder = new google.maps.Geocoder();
	const location: google.maps.LatLngLiteral = { lat: lat, lng: lng };
	
	return new Promise((resolve, reject) => {
		geocoder?.geocode({ 'location': { lat: lat, lng: lng } }, ( results, status ) => {
			if (status === 'OK') {
				if ( results?.length ) {
					const result: string|undefined = results?.at(0)?.formatted_address;
					resolve( result );
				} else {
					reject( `${lat}, ${lng}` ) ;
				}

			} else {
				reject( `${lat}, ${lng}` );
			} 
			
		}); 
	});
  }
}