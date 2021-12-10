import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'app-event-popover',
  templateUrl: './event-popover.component.html',
  styleUrls: ['./event-popover.component.scss']
})
export class EventPopoverComponent implements OnInit {
  @Input() event: CalendarEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
