import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DAYS_OF_WEEK, DAYS_OF_WEEK_COUNT } from 'src/app/core/constants/date.constants';
import { CalendarMonth, CalendarWeek } from 'src/app/core/models/calendar.model';
import { ReminderFormComponent } from './reminder-form/reminder-form.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public calendarMonth: CalendarMonth = [];
  public daysOfWeek: string[] = DAYS_OF_WEEK;
  public selectedDate: Date;

  constructor(private dialog: MatDialog) {
    const date = new Date();
    this.selectedDate = date;
  }

  ngOnInit() {
    this.calendarMonth = this.getCalendarMonth(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
  }

  private getCalendarMonth(year: number, month: number): CalendarMonth {
    const calendarMonth: CalendarMonth = []
    const date = new Date(year, month, 1);
    const dayOfWeek = date.getDay();
    const rows = this.getCalendarRows(date, dayOfWeek);
    const initialDate = new Date(date.getFullYear(), date.getMonth(), dayOfWeek - 1);
    for (let i = 0; i < rows; i++) {
      let calendarWeek: CalendarWeek = [];
      for (let j = 0; j < DAYS_OF_WEEK_COUNT; j++) {
        calendarWeek.push(new Date(initialDate));
        initialDate.setDate(initialDate.getDate() + 1);
      }
      calendarMonth.push(calendarWeek);
    }
    return calendarMonth;
  }

  private getCalendarRows(date: Date, dayOfWeek: number): number {
    const daysOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    return Math.ceil(dayOfWeek + daysOfMonth / 7);
  }

  public isWeekend(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  public isPartOfMonth(date: Date): boolean {
    return this.selectedDate.getMonth() === date.getMonth();
  }

  public openReminderForm(day: Date) {
    this.dialog.open(ReminderFormComponent, { data: { date: day } }).afterClosed().toPromise().then(data=> {
      console.log(data);
    })
  }
}
