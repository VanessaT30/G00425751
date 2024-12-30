import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage implements OnInit {

  constructor(private router: Router, private ds: MyDataService) {}

  ngOnInit() {
  }

    keyword:string = "";
  
    async openNews() {
          //set the keyword inputed in the home page to the storage in the data service
      await this.ds.set("kw", this.keyword)
      this.router.navigate(['/country'])
      console.log(this.keyword);
    }

}
