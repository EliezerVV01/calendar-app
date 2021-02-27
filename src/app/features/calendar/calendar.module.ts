import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { RouterModule } from '@angular/router';
import { CalendarItemComponent } from './calendar-item/calendar-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CalendarComponent,
      }
    ])
  ],
  declarations: [
    CalendarComponent,
    CalendarItemComponent
  ]
})
export class CalendarModule { }
