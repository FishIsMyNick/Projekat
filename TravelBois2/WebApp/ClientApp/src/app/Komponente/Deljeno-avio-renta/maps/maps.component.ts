import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from "@angular/google-maps";

import { Location } from '@angular/common';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html'
})
export class MapsComponent implements OnInit {

  constructor(private location: Location) {
    }

  ngOnInit() {
    //var geocoder = new google.maps.Geocoder();
    //var address = "Gogoljeva, Novi sad";
    //geocoder.geocode({ 'address': address }, function (results, status) {
     // if (status == google.maps.GeocoderStatus.OK) {
        // do something with the geocoded result
        //
        // results[0].geometry.location.latitude
        // results[0].geometry.location.longitude
       /// console.log('lat: ' + results[0].geometry.location.lat());
     // }
    //});

    //var address = "Gogoljeva 24";
    //var geo = new google.maps.Geocoder;
    //geo.geocode({ 'address': address }, function (results, status) {
    //  if (status == google.maps.GeocoderStatus.OK) {
    //    var myLatLng = results[0].geometry.location;

    //    // Add some code to work with myLatLng
    //    console.log("ispis" + myLatLng);

    //  } else {
    //    alert("Geocode was not successful for the following reason: " + status);
    //  }
    //});

    
  }
  onBack() {
    this.location.back();
  }




}
