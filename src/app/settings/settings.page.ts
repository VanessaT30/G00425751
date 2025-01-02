import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonItem, IonList, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonButton,  IonSelect, IonSelectOption, IonList, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {
  metric:any = "metric";
  unit:string = "";

  constructor(private ds: MyDataService, private mhs: MyHttpService, private router: Router) { }
  // calls the method upon initialisin ghte page
  ngOnInit() {
    this.setUnit();
  }
  // // sets the unit key and the variable that the user set
  // async setDefault() {
  //   await this.ds.set("unit", this.metric)
  //   console.log(this.unit);
  // }

  // sets the unit key for the variable that the user set
  async setUnit() {
    await this.ds.set("unit", this.unit)
    this.router.navigate(['/home'])
    console.log(this.unit);
  }
}
