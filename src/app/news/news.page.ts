import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpOptions } from '@capacitor/core';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';

// imported necessary modules and libraries for the news view page
@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard,  IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage implements OnInit {

  constructor(private router: Router, private mhs: MyHttpService, private ds: MyDataService) {}
  // initialises all variables needed (api key, country code and the country json data itself)
  apiKey:string = "pub_63814d15701404347256f951eb267372ed4c1";
  countryCodeCCA2: string = "";
  countryNewsInfo!:any;
  countryName:string = "";

  options:HttpOptions = {
    url:' https://newsdata.io/api/1/latest?apikey=' + this.apiKey + '&country='
  }

  // calls the method upon loading the page
  ngOnInit() {
    this.getCountryName();
  }

  //gets the country name and country code from storage
  //fills in the full url and fetches it using the httpService then inputs the data into the
  //countryNewsInfo variable
  async getCountryName() {
    this.countryName = await this.ds.get('country');
    this.countryCodeCCA2 = await this.ds.get('CCA2');
    this.options.url = this.options.url.concat(this.countryCodeCCA2);
    let result = await this.mhs.get(this.options);
    this.countryNewsInfo = result.data.results;
    }
}
