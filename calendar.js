/**
 * File: calendar.js
 * Author: Colin Shum
 * Description: This file implements the Calendar class using vanilla Javascript.
 */

class Calendar {
    // The calendar class' constructor. It will provide today's month and year if parameters are not provided.
    // Parameters: year (Type: Number, Requirement: >0), month (Type: Number, Requirement: 1 <= month <= 12)
    // Return: none
    constructor(year, month) {
      // set values with today's date or given parameters
      this.year = (!isNaN(year)) ? year : new Date().getFullYear();
      this.month = (!isNaN(month)) ? month - 1 : new Date().getMonth();
      
      // initialize calendar resources
      this.html = '';
      this.monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
      this.dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      
      this.renderCalendar();  
    }
  
    // A function to check if it is currently a February of a leap year
    // Return: true if the above requirement is met.
    isLeapYearAndMonth() {
      // TODO: test leap year functionality in spec
      return this.month === 1 && (this.year % 100 === 0) ? (this.year % 400 === 0) : (this.year % 4 === 0);
    }
    
    // A function to move the calendar to the previous month, and if applicable, the previous year.
    // Side Effect: Renders the calendar when called
    // Return: none
    prevMonth() {
      // TODO: test prev month functionality in spec
      if (this.month === 0) { 
        this.year--; 
        this.month = 11; 
      }
      else {
        this.month--;
      }
      this.renderCalendar();
    }
  
    // A function to move the calendar to the next month, and if applicable, the next year.
    // Side Effect: Renders the calendar when called
    // Return: none
    nextMonth() {
      // TODO: test next month functionality in spec
      if (this.month === 11) { 
        this.year++; 
        this.month = 0; 
      }
      else { 
        this.month++; 
      }
      this.renderCalendar();
    }
  
    // A function to clear the current HTML buffer stored in the object.
    // Side Effect: Calls this.setHTML()
    // Return: none
    clearCalendar() { 
      // TODO: test clear calendar functionality in spec
      this.setHTML('');
    }

    // A function to set the current HTML buffer to the given html parameter
    // Parameters: html(Type: String, Requirement: valid HTML code or '')
    // Side Effect: Renders the given code in the browser
    // Return: none
    setHTML(html) {
      this.html = html;
      document.body.innerHTML = this.html;
    }

    // A function to render the calendar by generating HTML code
    // It uses templating to abstract the logic from the HTML
    // Side Effect: Calls setHTML
    // Return: none
    renderCalendar() {
      // clears current buffer
      this.clearCalendar(); 
      
      // template replacements
      let calDayLabels = '';
      let calDayNumbers = '';

      // generates the weekday labels from Sun - Sat
      this.dayLabels.forEach((day) => {
        calDayLabels += `<td class="weekdays-header"> ${day} </td>`
      });

      // generates dates for calendar and puts them into their respective cells
      let firstDay = new Date(this.year, this.month, 1);
      let numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      let monthLength = (this.isLeapYearAndMonth()) ? numDaysInMonth[this.month] + 1 : numDaysInMonth[this.month];
      let dayCounter = 1;
      let weeksInMonth = Math.ceil((monthLength + firstDay.getDay()) / 7);
        
      for (let week = 0; week < weeksInMonth; week++) {
        for (let day = 0; day < 7; day++) {
          calDayNumbers += '<td class="calendar-day-num">';
          if ((day >= firstDay.getDay() || week > 0) && dayCounter <= monthLength) {
            calDayNumbers += dayCounter;
            dayCounter++;
          }
          calDayNumbers += '</td>';
        }
        // stops if enough rows are generated to fill the month's length
        if (dayCounter > monthLength) { break; }
        else { calDayNumbers += '</tr><tr class="week">'; }
      }

      // calendar html template
      let renderHTML = `
        <div class="container">
          <p class="current-date-header">
            ${this.monthLabels[this.month]} ${this.year}
          </p>
          <button class="navButton" onclick="calendar.prevMonth()">
            <span> << </span>
          </button>
          <div class="table-container">
            <table class="table">
              <tr class="weekday-title-container">
                ${calDayLabels}
              </tr>
              <tr class="week">
                ${calDayNumbers}
              </tr>
            </table>
          </div>
          <button class="navButton" onclick="calendar.nextMonth()">
            <span> >> </span> 
          </button>
        </div>
      `

      this.setHTML(renderHTML);
    }
  }
