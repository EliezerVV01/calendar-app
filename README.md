# Overview

Calendar app is a web application that allows users to add reminders for a specific date, choosing the time and city. It also provides  weather information for each reminder based on the time and city. 

# Features
 ## Mandatory Features
 - Add new reminder (max 30 chars), including day, time and city.
 - Display reminders on the calendar view in the correct time order.
 - Allow the user to select color when creating a reminder and display it appropriately.
 - Ability to edit reminders – including changing text, city, day, time and color.
 - Display reminder details with the weather forecast for the selected date/time and city
 - Testing of the funcionality "Add new reminder"

 ## Bonus Features

 - Properly handle overflow when multiple reminders appear on the same date.
 - Functionality to delete one reminder

# Project Structure

Calendar app is built with Angular using the following structure. Open folders are represented by `\` and close by `*`.

```
app\
    core\
        components *
        constans *
        models *
        services *
        utils *
        core.module.ts
    features \
        calendar \
            calendar-item *
            reminder-details *
            reminder-form *
        calendar.components.ts|html|scss
        calendar.module.ts
    shared \
        pipes *
    shared.module.ts
    store \
        index.ts
        rehydration.ts
        reminders.store.ts
app.component.ts|scss|html
app.module.ts
```

# Setting Up Project
## Environment Variables

In order to run this project correctly, you need to create a folder called 'environments' under `src` and add a file `enviroment.ts` with the following content. If the apiKey is not working, please create an account at [openweather]('https://home.openweathermap.org/users/sign_up') then look under the [API KEY tab]('https://home.openweathermap.org/api_keys')

```
export const environment = {
  apiKey: '9d2b1b4ee1b38180cca6b48d6163fc3e',
  production: false,
  apiUrl: 'https://api.openweathermap.org/data/2.5',
};

```

# Installing Dependencies

```
npm install
```

# Running Project

```
npm start
```

# Running unit tests

```
npm run test
```

