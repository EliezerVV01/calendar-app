import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    NavBarComponent,
  ]
})
export class CoreModule { }