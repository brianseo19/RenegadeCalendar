import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[long-press]'
})
export class LongPressDirective {

  constructor() { }

  pressing: boolean;
  longPressing: boolean;
  timeout: any;
  interval: number;

  @Output()
  onLongPress = new EventEmitter();

  @Output()
  doneLongPress = new EventEmitter();

  @HostBinding('class.press')
  get press() { return this.pressing; }

  @HostBinding('class.longpress')
  get longPress() { return this.longPressing; }


  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    console.log(event)
    this.timeout = setTimeout(() => {
      this.longPressing = true;
      this.onLongPress.emit(this.longPressing);
    }, 500);
  }

  // @HostListener('touchend')
  @HostListener('mouseup')
  // @HostListener('mouseleave')
  endPress() {
    console.log("end")
    // clearTimeout(this.timeout);
    this.longPressing = false;
    this.pressing = false;
    this.doneLongPress.emit()
  }
}
