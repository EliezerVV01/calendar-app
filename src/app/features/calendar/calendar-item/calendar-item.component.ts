import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarItemComponent implements OnInit {

  @Input() date: Date = new Date();
  @Input() isWeekend: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isFirstDayOfWeek: boolean = false;
  @Input() isFirstRowItem: boolean = false;
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit() {}

}
