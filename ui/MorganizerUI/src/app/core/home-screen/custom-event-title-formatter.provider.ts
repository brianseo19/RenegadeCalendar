import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { formatDate } from '@angular/common';
import * as moment from 'moment';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  month(event: CalendarEvent): string {
    if (!event.meta.eventModel.allDayEvent) {
      return `<b>${formatDate(event.start, 'hh:mm aa', this.locale)}</b> ${
        event.title
      }`;
    } else  {
      return `${event.title}`;
    }
  }

  week(event: CalendarEvent): string {
    if (!event.meta.eventModel.allDayEvent) {
      return `${formatDate(event.start, 'h:mm a', this.locale)}<br><b>${
        event.title
      }<b>`;
    } else  {
      return `${event.title}`;
    }

  }

  day(event: CalendarEvent): string {
    if (!event.meta.eventModel.allDayEvent) {
      return `<b>${formatDate(event.start, 'hh:mm aa', this.locale)}</b> ${
        event.title
      }`;
    } else  {
      return `${event.title}`;
    }
  }
}
