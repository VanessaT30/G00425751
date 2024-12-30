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
  latitude: any = "53";
  longitude: any = "-8";
  units: any = "metric";
  countryWeather!:any;
  options:HttpOptions = {
    url:' https://api.openweathermap.org/data/2.5/weather?lat=' + this.latitude + '&lon=' + this.longitude + '&units' + this.units + '&appid=' + this.apiKey
  }

  ngOnInit() {
    this.getCountryName();
  }

  async getCountryName() {
    // this.apiKey = await this.ds.get('latlng');
    // this.options.url = this.options.url.concat(this.apiKey);
    let result = await this.mhs.get(this.options);
    this.countryWeather = result.data.results;
    
    console.log(this.options.url);
    // console.log(JSON.stringify(this.countryInfo.data));
    }

}
