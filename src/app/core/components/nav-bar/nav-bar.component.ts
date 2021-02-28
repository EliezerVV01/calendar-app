import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" routerLink="/">
      <img src="assets/images/calendar-icon.png" alt="logo" id="logo"/>
      Calendar App
    </a>
  </div>
  </nav>
  `,
  styles: ['#logo { height: 25px; }']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
