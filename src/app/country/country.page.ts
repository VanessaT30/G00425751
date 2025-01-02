import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpOptions } from '@capacitor/core';
import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CountryPage implements OnInit {

  constructor(private ds: MyDataService, private mhs: MyHttpService, private router: Router) { }
  // initialised the variables needed for keyword, country api data and the CCA2 name needed for the news url
  keyword:string = "";
  countryInfo!:any;
  countryCode: string = "";

  //used the name endpoint from restcountries
  options:HttpOptions = {
    url:' https://restcountries.com/v3.1/name/'
  }

  ngOnInit() {
    this.getKW();
  }

  // method to get the keyword and input it into the country api url and fetch the data using that keyword
  async getKW() {
    this.keyword = await this.ds.get('kw');
    this.options.url = this.options.url.concat(this.keyword);
    let result = await this.mhs.get(this.options);
    this.countryInfo = result.data;

    this.countryCode = this.countryInfo.cca2;
    console.log(this.countryCode);
      }

  // Sets the official country name into storage and
  // country code (CCA2) and input it into the news api url and fetch the data
  // then redirects to the news page
  async openNews(c:any) {
    //sets the country code (CCA2) chosen in the country page from the data service storage
    JSON.stringify(c.cca2)
    await this.ds.set("CCA2", c.cca2)
    await this.ds.set("country", c.name.official)
    this.router.navigate(['/news'])
  }

  // Does the same as the news method but takes the latitude and longitude values to input it into the
  // weather url api
  async openWeather(c:any) {
    //set the keyword inputed in the home page to the storage in the data service
    await this.ds.set("latlng", c.latlng)
    await this.ds.set("capitalW", c.capital)
    this.router.navigate(['/weather'])
    console.log(c.latlng);
  }
}
