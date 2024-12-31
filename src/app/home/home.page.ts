import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, FormsModule],
})

export class HomePage {

// addIcons({
//   'flag-en': 'assets/flags/en.svg',
//   'flag-de': 'assets/flags/de.svg'
// });

  keyword:string = "";

  constructor(private router: Router, private ds: MyDataService) {
    addIcons({ settingsOutline });
  }

  async openCountry() {
        //set the keyword inputed in the home page to the storage in the data service
    await this.ds.set("kw", this.keyword)
    this.router.navigate(['/country'])
    console.log(this.keyword);
  }

  async openSettings() {
    //set the keyword inputed in the home page to the storage in the data service
// await this.ds.set("kw", this.keyword)
this.router.navigate(['/settings'])
// console.log(this.keyword);
}

}
