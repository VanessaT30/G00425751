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
  keyword:string = "";
  // apiKey:string = "fe2e42c8";
  countryInfo!:any;
  countryCode: string = "";
  //used the name endpoint from restcountries
  options:HttpOptions = {
    url:' https://restcountries.com/v3.1/name/'
  }

  ngOnInit() {
    this.getKW();
    // this.openNews();
  }

  async getKW() {
    this.keyword = await this.ds.get('kw');
    this.options.url = this.options.url.concat(this.keyword);
    let result = await this.mhs.get(this.options);
    this.countryInfo = result.data;

    this.countryCode = this.countryInfo.cca2;
    console.log(this.countryCode);
    // console.log(JSON.stringify(this.countryInfo.data));
      }

  async openNews(c:any) {
    //sets the country CCA2 chosen in the country page from the data service storage
    JSON.stringify(c.cca2)
    await this.ds.set("CCA2", c.cca2)
    this.router.navigate(['/news'])
    console.log(this.countryCode);
  }

  async openWeather(c:any) {
    //set the keyword inputed in the home page to the storage in the data service
    await this.ds.set("latlng", c.latlng)
    await this.ds.set("capitalW", c.capital)
    this.router.navigate(['/weather'])
    console.log(c.latlng);
  }
}
