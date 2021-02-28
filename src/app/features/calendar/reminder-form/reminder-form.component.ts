import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ACTION } from 'src/app/core/constants/dialog.contasts';
import { City } from 'src/app/core/models/city.model';
import {  Reminder, ReminderControls, ReminderGroupForm } from 'src/app/core/models/reminder.model';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: Reminder,
    private weatherService: WeatherService, private dialogRef: MatDialogRef<ReminderFormComponent>) {
    this.colors = ['#6AFF9A', '#6AFFF5', '#6A77FF', '#FF6AA0', '#BFBFBF'];
    this.cities = this.weatherService.citiesList;
    this.form = new FormGroup({
      description: new FormControl(this.data?.description || '', [Validators.required, Validators.maxLength(30)]),
      city: new FormControl(this.data?.city?.value || '', [Validators.required]),
      time: new FormControl(this.data?.time || '', [Validators.required]),
      color: new FormControl(this.data?.color || this.colors[0]),
      date: new FormControl(this.data?.date ? new Date(this.data.date) : ''),
    } as ReminderControls) as ReminderGroupForm;
  
  }

  ngOnInit() {

  }

  public changeColor(color: string) {
    this.form.setValue({ ...this.form.value, color });
  }

  public async addReminder() {
    const reminder = await this.createReminderObject();
    reminder.id = Math.trunc((new Date().getTime() / 2000)),
    this.dialogRef.close({data: reminder, action: ACTION.ADD});
  }

  public async updateReminder(){
    const reminder = await this.createReminderObject();
    reminder.id = this.data.id;
    this.dialogRef.close({data: reminder, action: ACTION.UPDATE});
  }

  private async createReminderObject(): Promise<Reminder>{
    const selectedCity: City = this.cities.find(c => c.value === this.form.value.city) || this.cities[0];
    const forecasts = await this.weatherService.getWeatherInformation(selectedCity);
    const weather = forecasts?.daily?.filter((weather: any) => new Date(weather.dt * 1000).toDateString() === this.form.value.date?.toDateString())
    return {
      description: this.form.value.description,
      city: selectedCity,
      time: this.form.value.time,
      color: this.form.value.color,
      date: new Date(this.form.value.date).toISOString(),
      weather: weather[0]?.weather[0]?.description,
    }
  }
}
