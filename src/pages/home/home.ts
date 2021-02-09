import { Component, MissingTranslationStrategy } from '@angular/core';
import { NavController, PanGesture } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { WeatherProvider } from '../../providers/weather/weather';
import { NewsProvider } from '../../providers/news/news';
import { Storage } from '@ionic/storage';
import { InternalFormsSharedModule } from '@angular/forms/src/directives';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weathermain: string;
  weatherdescription: string;
  icon: string;
  temp: number;
  feel: number;
  name: string;
  city: string;
  units: string;
  country: string;

  totalResults: number;
  articles: string[];

  newsHidden: boolean = true;
  newsDisabled: boolean = true;


  constructor(
    public navCtrl: NavController, 
    private wp: WeatherProvider, 
    private np: NewsProvider, 
    private storage: Storage) { 

    }

  openSettingsPage() {
    this.newsHidden = true;
    this.articles = null; 
    this.navCtrl.push(SettingsPage);
  
  }

  ionViewWillEnter() {
    this.storage.get("settings").then((settings) => {
      if (settings != null) {
      this.city = settings.city;
      this.units = settings.units;
      this.newsDisabled = false;
      
      this.wp.getWeather(this.city, this.units).subscribe(data => {
          this.weathermain = data.weather[0].main;
          this.weatherdescription = data.weather[0].description;
          this.icon = data.weather[0].icon;
          this.name = data.name;
          this.temp = data.main.temp;
          this.feel = data.main.feels_like;
          this.country = data.sys.country;
        });
      } else {
        this.city = "";
        this.units = "";
      }
    });
    }


    ionViewDidLoad(){

    }

  displayNews() {
    this.newsHidden = false;
  this.np.getNews(this.country).subscribe(info => {
    this.totalResults = info.totalResults;
    this.articles = info.articles;
  })
}

}
