import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DAYS_OF_WEEK, DAYS_OF_WEEK_COUNT } from 'src/app/core/constants/date.constants';
import {  CalendarMonth, CalendarWeek } from 'src/app/core/models/calendar.model';
import { Reminder } from 'src/app/core/models/reminder.model';
import { AppState } from 'src/app/store';
import { addReminder } from 'src/app/store/reminders.store';
import { ReminderFormComponent } from './reminder-form/reminder-form.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  public calendarMonth: CalendarMonth = [];
  public daysOfWeek: string[] = DAYS_OF_WEEK;
  public selectedDate: Date;
  public reminders: readonly Reminder[] = [];
  public reminders$?: Observable<readonly Reminder[]>;
  public subscriptions = new Subscription();

  constructor(private dialog: MatDialog, private store: Store<AppState>) {
    const date = new Date();
    this.selectedDate = date;
    this.reminders$ = this.store.select('reminders');
  }

  ngOnInit() {
    this.subscriptions.add(
      this.reminders$?.subscribe(state => {
        this.reminders = state;
        if (this.calendarMonth) {
          this.calendarMonth = this.updateReminders();
        }
      })
    )
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
        const date = new Date(initialDate);
        calendarWeek.push({
          isWeekend: this.isWeekend(date),
          date,
          isPartOfMonth: this.isPartOfMonth(date),
          reminders: this.getRemindersFrom(date.toISOString()),
        });
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

  private isWeekend(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  private isPartOfMonth(date: Date): boolean {
    return this.selectedDate.getMonth() === date.getMonth();
  }

  private getRemindersFrom(date: string): Reminder[] {
    return this.reminders.filter(reminder => reminder.date === date);
  }

  public openReminderForm(day: Date) {
    this.dialog.open(ReminderFormComponent, { data: { date: day } }).afterClosed().toPromise().then((data: Reminder) => {
      if (data && data.date) {
        this.store.dispatch(addReminder(data));
      }
    })
  }

  public updateReminders() {
    return this.calendarMonth.map(week => {
      return week.map(day => {
        return { ...day, reminders: this.getRemindersFrom(day.date.toISOString()) };
      })
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
