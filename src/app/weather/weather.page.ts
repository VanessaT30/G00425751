import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpOptions } from '@capacitor/core';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WeatherPage implements OnInit {

 constructor(private router: Router, private mhs: MyHttpService, private ds: MyDataService) {}

  apiKey:string = "8a7fc5f87d76122560a39f0e85a8195c";
  latitude: any;
  longitude: any;
  coord:any;
  unit: string = "";

  capitalCity:string = "";
  weatherInfo!:any;
  tempInfo!:any;

  options:HttpOptions = {
    url:'https://api.openweathermap.org/data/2.5/weather?lat='
  }

  iconInfo:any;
  icon: string = "";
  optionsIcon:HttpOptions = {
    url:'https://openweathermap.org/img/wn/'
  }

  ngOnInit() {
    this.getCountryLocation();
  }

  // gets the countrys location, unit of measure and capital city
  async getCountryLocation() {
  this.capitalCity = await this.ds.get('capitalW');
  this.unit = await this.ds.get('unit');
  this.coord = await this.ds.get('latlng');
    console.log(this.coord);
    [this.latitude, this.longitude] = this.coord; // destructures the json data and stores the variables separately

    // calls the full url with all the information needed and stores it in weather info.
    this.options.url = this.options.url.concat(this.latitude + '&lon=' + this.longitude + '&units=' + this.unit + '&appid=' + this.apiKey);
    let result = await this.mhs.get(this.options);
    this.weatherInfo = result.data.weather;
    this.tempInfo = result.data.main;

    }

}


