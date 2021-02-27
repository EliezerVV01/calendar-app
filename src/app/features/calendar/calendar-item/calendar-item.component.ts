import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ACTION } from 'src/app/core/constants/dialog.contasts';
import { Reminder } from 'src/app/core/models/reminder.model';
import { ReminderDetailsComponent } from '../reminder-details/reminder-details.component';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';

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
  @Output() deleteReminder = new EventEmitter<{ reminderId?: number }>();
  @Output() updateReminder = new EventEmitter<Reminder>();
  public day?: number;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.day = this.date.getDate();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.reminders) {
      this.reminders = this.orderByTime(changes.reminders.currentValue);
    }
  }

  private orderByTime(reminders: Reminder[]): Reminder[] {
    return reminders.sort((a: Reminder, b: Reminder) => a.time.localeCompare(b.time))
  }

  public openReminderDetails(reminder: Reminder) {
    this.dialog.open(ReminderDetailsComponent, { data: reminder }).afterClosed().toPromise()
      .then((data: { action: ACTION, data: Reminder }) => {
        if (data) {
          switch (data.action) {
            case ACTION.REMOVE:
              this.deleteReminder.emit({ reminderId: data.data.id });
              break;
            case ACTION.UPDATE:
              this.openEditReminder(data.data);
              break;
            default:
              break;
          }
        }
      })
  }

  public openEditReminder(reminder: Reminder) {
    this.dialog.open(ReminderFormComponent, { data: reminder }).afterClosed().toPromise().then((data: { action: ACTION, data: Reminder }) => {
      if (data) {
        this.updateReminder.emit(data.data);
      }
    })
  }
}
