import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'src/app/core/models/city.model';
import { Reminder, ReminderControls, ReminderGroupForm } from 'src/app/core/models/reminder.model';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReminderFormComponent implements OnInit {

  public form: FormGroup;
  public cities: City[];
  public colors: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { date: Date },
    private weatherService: WeatherService, private dialogRef: MatDialogRef<ReminderFormComponent>) {
    this.colors = ['#6AFF9A', '#6AFFF5', '#6A77FF', '#FF6AA0', '#BFBFBF'];
    this.cities = this.weatherService.citiesList;
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      city: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      color: new FormControl(this.colors[0]),
      date: new FormControl(this.data.date),
    } as ReminderControls) as ReminderGroupForm;
  }

  ngOnInit() {

  }

  public changeColor(color: string) {
    this.form.setValue({ ...this.form.value, color });
  }

  public addReminder() {
    this.dialogRef.close({...this.form.value});
  }
}
