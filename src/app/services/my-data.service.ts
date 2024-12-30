import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {

  constructor(private storage: Storage) { 
    this.init();
  }

  // Creates the storage
  async init() {
    await this.storage.create();
  }

  // Puts something into storage
  async set(key: string, value:any) {
    await this.storage.set(key, value);
  }

  // Gets something out of storage
  async get(key: string) {
    return await this.storage.get(key);
  }



}
