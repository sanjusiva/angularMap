import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor() { 
    this.start_end_mark.push(this.markers[0]);
    this.start_end_mark.push(this.markers[this.markers.length - 1]);
  }
  addressForm = new FormGroup({
    Street: new FormControl(''),
    City: new FormControl(''),
    State: new FormControl(''),
    Country: new FormControl(''),
  });
  resLat:any;
  resLng:any;
  resAdd1:any;
  resAdd2:any;
  start_end_mark:any[] = [];
  lat = 20.5937//51.678418;
  lng = 78.9629//7.809007;
  polygonPts: any[] = [];
  markers: marker[] = [
    {
      lat: 20.5937,
      lng : 78.9629,
      country:'India'
    },
    {
      lat: 25.2048,
      lng: 55.2708,
      country:'Dubai'
    },
    {
      lat: 19.0760,
      lng:72.8777,
      country:'Mumbai'
    },
    {
      lat: 7.8731,
      lng:80.7718,
      country:'Sri Lanka'
    }
  ];

  ngOnInit(): void {
   console.log("start_end: ",this.start_end_mark);
   var requestOptions = {
    method: 'GET',
  };
  //  fetch("https://api.geoapify.com/v1/geocode/search?text=India&apiKey=388f46f0cf594c87b507bfdbaecdab1c",requestOptions)
  //  .then(response => response.json())
  //  .then(result => console.log(result.features[0].properties.lat,result.features[0].properties.lon))
  //  .catch(error => console.log('error', error));

  // fetch("https://api.geoapify.com/v1/geocode/reverse?lat=20.5937&lon=78.9629&apiKey=388f46f0cf594c87b507bfdbaecdab1c", requestOptions)
  // .then(response => response.json())
  // .then(result => console.log(result.features[0].properties.country))
  // .catch(error => console.log('error', error));
   
  }

  mapClicked($event: MouseEvent) {
    var requestOptions = {
      method: 'GET',
    };
    console.log($event.coords.lat, $event.coords.lng);
    
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      country:''
    });
    console.log(this.markers);
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${$event.coords.lat}&lon=${$event.coords.lng}&apiKey=388f46f0cf594c87b507bfdbaecdab1c`, requestOptions)
  .then(response => response.json())
  .then(result =>{ 
    this.resAdd1=result.features[0].properties.address_line1;
    this.resAdd2=result.features[0].properties.address_line2;
    console.log(result.features[0].properties.state,result.features[0].properties.country,result.features[0].properties.address_line1)
  })
  .catch(error => console.log('error', error));
    
  }
  mapReady(event:any){
    this.polygonPts = [
     {
       lat: 32.299507,
       lng : -64.790337
     },
     {
       lat: 32.17,
       lng: 58.2252
     },
     {
       lat:  64.47,
       lng: 25.2132
     }
    ]
 }
 getlatlng(fields:any){
  console.log(fields.value);
  var requestOptions = {
    method: 'GET',
  };
   fetch(`https://api.geoapify.com/v1/geocode/search?text=${fields.value.City}%20${fields.value.State}%20${fields.value.Country}&apiKey=388f46f0cf594c87b507bfdbaecdab1c`,requestOptions)
   .then(response => response.json())
   .then(result => {
    this.resLat=result.features[0].properties.lat;
    this.resLng=result.features[0].properties.lon
    console.log(result.features[0].properties.lat,result.features[0].properties.lon)
  })
   .catch(error => console.log('error', error));
  
 }

}


interface marker {
  lat: number;
  lng: number;
  country:String;
}