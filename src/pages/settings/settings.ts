import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { isThisTypeNode } from 'typescript';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  city: string;
  units: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage) {
      
      this.storage.get("settings").then((settings) => {
        if (settings != null) {
          this.city = settings.city;
          this.units = settings.units;
        } else {
          this.city = "Galway";
          this.units = "Metric";
        }
      });
    }

    ionViewDidLoad() {

    }
  
  saveSettings() {
    this.storage.set("settings", { city: this.city, units: this.units})
    this.navCtrl.pop();
  }
  
  
}
