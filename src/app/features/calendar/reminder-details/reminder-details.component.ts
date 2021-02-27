import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ACTION } from 'src/app/core/constants/dialog.contasts';
import { Reminder } from 'src/app/core/models/reminder.model';

@Component({
  selector: 'app-reminder-details',
  templateUrl: './reminder-details.component.html',
  styleUrls: ['./reminder-details.component.scss']
})
export class ReminderDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Reminder,
    private dialogRef: MatDialogRef<ReminderDetailsComponent>) { }

  ngOnInit() { }

  public removeReminder() {
    this.dialogRef.close({ action: ACTION.REMOVE, data: { id: this.data.id } });
  }

  public editReminder() {
    this.dialogRef.close({ action: ACTION.UPDATE, data: this.data });
  }

}
