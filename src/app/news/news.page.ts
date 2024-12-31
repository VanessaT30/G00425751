import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpOptions } from '@capacitor/core';
import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
// import { CountryPage } from '../country/country.page';CountryPage,
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard,  IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage implements OnInit {

  constructor(private router: Router, private mhs: MyHttpService, private ds: MyDataService) {}
  apiKey:string = "pub_63814d15701404347256f951eb267372ed4c1";
  countryCodeCCA2: string = "";
  countryNewsInfo!:any;
  countryName:string = "";
  //used the name endpoint from restcountries
  options:HttpOptions = {
    url:' https://newsdata.io/api/1/latest?apikey=' + this.apiKey + '&country='
  }

  ngOnInit() {
    this.getCountryName();
  }

  async getCountryName() {
    this.countryName = await this.ds.get('country');
    this.countryCodeCCA2 = await this.ds.get('CCA2');
    this.options.url = this.options.url.concat(this.countryCodeCCA2);
    let result = await this.mhs.get(this.options);
    this.countryNewsInfo = result.data.results;
    
    console.log(this.options.url);
    // console.log(JSON.stringify(this.countryInfo.data));
    }
}
