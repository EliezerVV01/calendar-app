import { Component, OnInit } from '@angular/core';
import { DAYS_OF_WEEK, DAYS_OF_WEEK_COUNT } from 'src/app/core/constants/date.constants';
import { CalendarMonth, CalendarWeek, SelectedDate } from 'src/app/core/models/calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public calendarMonth: CalendarMonth = [];
  public daysOfWeek: string[] = DAYS_OF_WEEK;
  public selectedDate: SelectedDate;

  constructor() {
    const date = new Date();
    this.selectedDate = { month: date.getMonth(), year: date.getFullYear() };
  }

  ngOnInit() {
    this.calendarMonth = this.getCalendarMonth(this.selectedDate);
  }

  private getCalendarMonth({ year, month }: SelectedDate): CalendarMonth {
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
    return this.selectedDate.month === date.getMonth();
  }
}
