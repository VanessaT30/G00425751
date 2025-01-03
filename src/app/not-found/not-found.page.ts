import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NotFoundPage implements OnInit {

  countryName:string = "";
constructor(private router: Router, private mhs: MyHttpService, private ds: MyDataService) {}

  ngOnInit() {
    this.getCountryName();
  }

  async getCountryName() {
    this.countryName = await this.ds.get('country');
    console.log(this.countryName);
    
  }

  async backHome() {
    this.router.navigate(['/country'])
  }
}
