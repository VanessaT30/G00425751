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
  keyword:string = ""; // initialised varibale to store keyword

  // new instances of services we will use
  constructor(private router: Router, private ds: MyDataService) {
    addIcons({ settingsOutline });
  }

  async openCountry() {
    // set the keyword inputed at the home page to storage in the data service 
    // then rerouted to the country page
    await this.ds.set("kw", this.keyword)
    this.router.navigate(['/country'])
  }

  //redirecting to the settings page
  async openSettings() {
  	this.router.navigate(['/settings'])
}

}
