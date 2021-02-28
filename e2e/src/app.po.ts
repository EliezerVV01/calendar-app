// @ts-nocheck
import { browser} from 'protractor';

export class AppPage {

  calendarItem;

  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async openReminderForm(): Promise<void> {
    const items = await $$('#calendar-item');
    this.calendarItem = await items[items.length - 5];
    await this.calendarItem.click()
  }

  async fillReminderForm(): Promise<void> {
    const descInput = await $('#reminder-description');
    await descInput.click();
    await descInput.clear();
    await descInput.sendKeys('Important meeting with CEO');
    const value = await descInput.getAttribute('value');
    expect(value).toEqual('Important meeting with CEO');
    const cityInput = await $('#reminder-city'); 
    await cityInput.click();
    const option = await $('#mat-option-0') ;
    await option.click();
    const cityInputText = await cityInput.$('.mat-select-value-text').getText('value');
    expect(cityInputText).toEqual('New York');
    const timePicker = await $('.time-picker');
    await timePicker.click();
    await timePicker.sendKeys('\uE013');
    await timePicker.sendKeys('\uE014');
    await timePicker.sendKeys('\uE013');
    await timePicker.sendKeys('\uE014');
    await timePicker.sendKeys('\uE013');
    const timePikcerText = await timePicker.getAttribute('value');
    expect(timePikcerText).toEqual('01:00');
   const saveBtn = await $('#save-button');
   await saveBtn.click(); 
  }

  async checkReminderWasCreated(): Promise<void> {
    setTimeout(this.check);  
  }

  async check(){
    const reminder = await this.calendarItem.$('.mat-chip > div');
    const reminderText = await reminder.getText();
    expect(reminderText).toEqual('Important meeting with CEO');
  }
}
