import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  constructor(private ds: MyDataService, private mhs: MyHttpService) { }
  keyword:string = "";
  // apiKey:string = "fe2e42c8";
  countryInfo!:any;
  //used the name endpoint from restcountries
  options:HttpOptions = {
    url:' https://restcountries.com/v3.1/name/'
  }

  ngOnInit() {
    this.getKW();
  }

  async getKW() {
    // set the keyword taken from storage in the data service
    this.keyword = await this.ds.get('kw');
    // sets the new url with the input from user
    this.options.url = this.options.url.concat(this.keyword);
    //this.movieInfo = this.mhs.get(this.options);

    // fetches the url 
    let result = await this.mhs.get(this.options);
    this.countryInfo = result.data
    
    console.log(this.options.url);
    
    // console.log(JSON.stringify(this.countryInfo.data));
    
      }

}
