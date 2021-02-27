import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { WeatherService } from './services/weather.service';

@NgModule({
  declarations: [
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    NavBarComponent,
  ],
  providers: [
    WeatherService,
  ]
})
export class CoreModule { }