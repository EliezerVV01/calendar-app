import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Reminder } from 'src/app/core/models/reminder.model';

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

  constructor() {}

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
}
