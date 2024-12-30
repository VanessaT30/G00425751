import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonInput, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, FormsModule],
})
export class HomePage {
  keyword:string = "";

  constructor(private router: Router, private ds: MyDataService) {}

  async openCountry() {
        //set the keyword inputed in the home page to the storage in the data service
    await this.ds.set("kw", this.keyword)
    this.router.navigate(['/country'])
    console.log(this.keyword);
  }

}
