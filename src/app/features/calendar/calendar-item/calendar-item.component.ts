import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reminder } from 'src/app/core/models/reminder.model';
import { ReminderDetailsComponent } from '../reminder-details/reminder-details.component';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarItemComponent implements OnInit, OnChanges {

  @Input() date: Date = new Date();
  @Input() isWeekend: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isFirstDayOfWeek: boolean = false;
  @Input() isFirstRowItem: boolean = false;
  @Input() disabled: boolean = false;
  @Input() reminders: Reminder[] = [];
  public day?: number;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.day = this.date.getDate();
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.reminders){
      this.reminders = this.orderByTime(changes.reminders.currentValue);
    }
  }

  private orderByTime (reminders:Reminder[]): Reminder[]{
    return reminders.sort((a: Reminder, b: Reminder) => a.time.localeCompare(b.time))
  }

  public openReminderDetails(reminder: Reminder){
    this.dialog.open(ReminderDetailsComponent, {data: reminder});
  }
}
