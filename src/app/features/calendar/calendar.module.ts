import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { RouterModule } from '@angular/router';
import { CalendarItemComponent } from './calendar-item/calendar-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReminderFormComponent } from './reminder-form/reminder-form.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CalendarComponent,
      }
    ]),
    CommonModule,
    SharedModule,
  ],
  declarations: [
    CalendarComponent,
    CalendarItemComponent,
    ReminderFormComponent,
  ],
})
export class CalendarModule { }
