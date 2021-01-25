import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
//import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { Global } from 'src/app/globals/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router,
    public _global: Global
  ) {
    _global.isUserLoggedIn = localStorage.getItem('access_token') != null ? true : false;
  }
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  showProgress = true;
  title = 'RoutingDemo';

  logoff() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }
  // public latitude: number;
  // public longitude: number;
  // public searchControl: FormControl;
  // public zoom: number;

  // @ViewChild("search")
  // public searchElementRef: ElementRef;

  // constructor(
  //   private mapsAPILoader: MapsAPILoader,
  //   private ngZone: NgZone
  // ) { }

  // ngOnInit() {
  //   debugger
  //   //set google maps defaults
  //   this.zoom = 4;
  //   this.latitude = 39.8282;
  //   this.longitude = -98.5795;

  //   //create search FormControl
  //   this.searchControl = new FormControl();

  //   //set current position
  //   this.setCurrentPosition();

  //   //load Places Autocomplete
  //   debugger
  //   this.mapsAPILoader.load().then(() => {
  //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
  //       types: ["address"]
  //     });
  //     autocomplete.addListener("place_changed", () => {
  //       this.ngZone.run(() => {
  //         //get the place result
  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();

  //         //verify result
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }

  //         //set latitude, longitude and zoom
  //         this.latitude = place.geometry.location.lat();
  //         this.longitude = place.geometry.location.lng();
  //         this.zoom = 12;
  //       });
  //     });
  //   });
  // }

  // private setCurrentPosition() {
  //   debugger
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 12;
  //     });
  //   }
  //}

}
