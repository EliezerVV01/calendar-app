import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reminder } from 'src/app/core/models/reminder.model';

@Component({
  selector: 'app-reminder-details',
  templateUrl: './reminder-details.component.html',
  styleUrls: ['./reminder-details.component.scss']
})
export class ReminderDetailsComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: Reminder) { }

  ngOnInit() {}

}
