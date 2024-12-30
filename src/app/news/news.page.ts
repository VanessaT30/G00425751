import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpOptions } from '@capacitor/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage implements OnInit {

  constructor(private router: Router, private mhs: MyHttpService, private ds: MyDataService) {}

 keyword:string = "";
  apiKey:string = "pub_63814d15701404347256f951eb267372ed4c1";
  countryNewsInfo!:any;
  //used the name endpoint from restcountries
  options:HttpOptions = {
    url:' https://restcountries.com/v3.1/name/'
  }

  ngOnInit() {
  }

  async getCountryName() {
    this.keyword = await this.ds.get('kw');
    this.options.url = this.options.url.concat(this.keyword);
    let result = await this.mhs.get(this.options);
    this.countryNewsInfo = result.data
    
    console.log(this.options.url);
    // console.log(JSON.stringify(this.countryInfo.data));
      }
  
    async openNews() {
          //set the keyword inputed in the home page to the storage in the data service
      await this.ds.set("kw", this.keyword)
      this.router.navigate(['/country'])
      console.log(this.keyword);
  }
}
