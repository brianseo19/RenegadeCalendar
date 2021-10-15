import { Component, OnInit } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-calendar-control',
  templateUrl: './calendar-control.component.html',
  styleUrls: ['./calendar-control.component.scss'],
})
export class CalendarControlComponent implements OnInit {
  view: any = CalendarView.Month;
  viewDate: Date = new Date();
  CalendarView = CalendarView;
  activeDayIsOpen: boolean = false;
  today: Date = new Date();
  showAgenda = false;

  // Adding task view list 
  showTaskView = false;

  constructor(private storeService: StoreService) {
    this.storeService.calendarDayClicked.subscribe((date) => {
      this.viewDate = date;
    });
    this.storeService.calendarViewChange.next({
      viewDate: this.viewDate,
      view: this.view,
    });
  }

  ngOnInit(): void {}
  addEvent() {}
  setView(view: any) {
    if (view === 'agenda') {
      this.view = CalendarView.Month;
      this.showAgenda = true;
      this.showTaskView = false;
    } 
    else if (view === 'taskView'){
      this.view = CalendarView.Week;
      this.showAgenda = false;
      this.showTaskView = true;
      // this.storeService.setProperty("viewDate", this.viewDate);
    }
      else {
      this.view = view;
      this.showAgenda = false;
      this.showTaskView = false;
    }
    this.updateCalendarView();
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  updateCalendarView() {
    // console.log(this.view, this.showAgenda, this.showTaskView);
    this.storeService.calendarViewChange.next({
      viewDate: this.viewDate,
      view: this.view,
      showAgenda: this.showAgenda,
      showTaskView: this.showTaskView
    });
  }
}
