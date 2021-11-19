import { Component, OnInit, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import { SaveTimeDialogComponent } from './save-time-dialog/save-time-dialog.component';
@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})


export class StopwatchComponent implements OnInit, OnDestroy {
  clock: any;
  hours: any= '00'
  minutes: any = '00';
  seconds: any = '00';
  milliseconds: any = '00';
  eventTitle: String;

  @Input() start: boolean;
  @Input() showTimerControls: boolean;

  constructor(private eventService: EventService, private dialog: MatDialog) {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['start']);
    if (changes['start'].currentValue) {
      this.startTimer();
    }
    else{
      this.clearTimer();
    }
  }

  laps: any = [];
  counter: number;
  timerRef;
  running: boolean = false;
  startText = 'Start';


  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.startText = 'Stop';
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        
        this.counter = Date.now() - startTime;
        this.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
        this.minutes = Math.floor(Math.floor(this.counter % 3600000) / 60000).toFixed(0);
        this.hours = Math.floor(this.counter / 3600000);
        
        if (Number(this.hours) < 10) {
          this.hours = '0' + this.hours;
        } else {
          this.hours = ' ' + this.hours;
        }
        if (Number(this.minutes) < 10) {
          this.minutes = '0' + this.minutes;
        } else {
          this.minutes = '' + this.minutes;
        }
        if (Number(this.seconds) < 10) {
          this.seconds = '0' + this.seconds;
        } else {
          this.seconds = '' + this.seconds;
        }
      });
    } else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
    }
  }

  lapTimeSplit() {
    let lapTime = this.minutes + ':' + this.seconds + ':' + this.milliseconds;
    this.laps.push(lapTime);
  }

  clearTimer() {
    this.running = false;
    this.startText = 'Start';
    this.counter = undefined;
    this.hours = '00',
      this.seconds = '00',
      this.minutes = '00';
    this.laps = [];
    clearInterval(this.timerRef);
  }

  saveTime() {
    if(this.running){
      this.running = !this.running;
      this.startText = "Resume";
      clearInterval(this.timerRef);
      this.openSaveDialog()
    }
    else {
      clearInterval(this.timerRef);
      this.openSaveDialog()
    }
    
  }

  openSaveDialog() {
    const dialogRef = this.dialog.open(SaveTimeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save') {
        this.eventService.triggerTimeSave(this.hours+':'+this.minutes+':'+this.seconds);
      }
    })
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

  ngOnInit() {
  }

}
