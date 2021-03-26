import { Component, OnInit, TemplateRef } from '@angular/core';
import { Calendar } from "../models/calendar.model";
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})


export class CalendarComponent implements OnInit {
  div1:boolean=false;
  public monthDays!: Calendar[];

  public monthNumber!: number;
  public year!: number;

  public weekDaysName : string[]= [] ;
  constructor(public calendarService: CalendarService) { 
   }

  ngOnInit(): void {
    this.setMonthDays(this.calendarService.getCurrentMonth());

    this.weekDaysName.push("Monday");
    this.weekDaysName.push("Tuesday");
    this.weekDaysName.push("Wednesday");
    this.weekDaysName.push("Thursday");
    this.weekDaysName.push("Friday");
    this.weekDaysName.push("Saturday");
    this.weekDaysName.push("Sunday");
  }

  onNextMonth(): void {
    this.monthNumber++;

    if (this.monthNumber == 13) {
      this.monthNumber = 1;
      this.year++;
    }

    this.setMonthDays(this.calendarService.getMonth(this.monthNumber, this.year));
  }

  onPreviousMonth() : void{
    this.monthNumber--;

    if (this.monthNumber < 1) {
      this.monthNumber = 12;
      this.year--;
    }

    this.setMonthDays(this.calendarService.getMonth(this.monthNumber, this.year));
  }

  private setMonthDays(days: Calendar[]): void {
    this.monthDays = days;
    this.monthNumber = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
  }
  div1Function(){
    this.div1=!this.div1;
    
}

}