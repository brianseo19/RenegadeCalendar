import { OnInit } from '@angular/core';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TodoListService } from '../../../services/todo-list.service';
import { StoreService } from 'src/app/services/store.service';
// import { NewListDialogComponent } from './new-list-dialog/new-list-dialog.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { EventService } from '../../../services/event.service';
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  getISODay,
  parseISO,
  isSameDay,
  parse,
  formatISO
} from 'date-fns';
import { TaskModel } from '../../../services/model/task-model';
import { MyCalendarModel } from '../../../services/model/mycalendar-model';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  completedTaskList = [];
  todoLists = [];
  CalendarView = CalendarView.Week;
  viewDate = new Date();
  weekDates: Date[];
  weekDateFormat = [];
  weekTasks = {};
  columnID = [];
  subscriptionToUpdateTasks: Subscription;
  
  ngOnInit(): void {
    this.getAllTasks();
    this.getDatesForWeek();
  }

  constructor(
    private taskService: TodoListService,
    private storeService: StoreService,
    private eventService: EventService
  ) {
    this.storeService.calendarViewChange.subscribe((calendarView) => {
      this.viewDate = calendarView.viewDate;
      this.getDatesForWeek();
      this.sortTasksByDay();
    });
    this.subscriptionToUpdateTasks = this.storeService.getUpdatedTasks().subscribe((updatedTasks) => {
      this.todoLists = updatedTasks;
      console.log(this.todoLists)
      this.sortTasksByDay();
    })
  }

  getDatesForWeek() {
    const startWeek = startOfWeek(this.viewDate);
    const endWeek = endOfWeek(startWeek);
    this.weekDates = eachDayOfInterval({ start: startWeek, end: endWeek });
    this.weekDateFormat = [];

    this.weekDates.forEach((date) => {
      var temp = format(date, 'EEEE MMM d');
      this.weekDateFormat.push(temp);
    });
    console.log(this.weekDateFormat);
  }

  getAllTasks() {
    this.taskService
      .getTask(this.storeService.loggedInUser?.id)
      .subscribe((response) => {
        if (response) {
          this.completedTaskList = [];
          this.todoLists = [];
          response.forEach((todoList) => {
            let taskList: TaskModel[] = [];

            if (todoList.tasks) {
              todoList.tasks.forEach((taskResponse) => {
                const task: TaskModel = new TaskModel();
                task.id = taskResponse.id;
                task.complete = taskResponse.complete;
                task.description = taskResponse.description;
                task.dueDate = taskResponse.dueDate;
                task.title = taskResponse.title;
                task.todoListId = taskResponse.todoListId;
                task.userId = this.storeService.loggedInUser.id;
                let defaultCal = new MyCalendarModel();
                defaultCal.calendarId = this.storeService.loggedInUser?.defaultCalendarId;
                task.calendar = defaultCal;

                if (task.complete) {
                  this.completedTaskList.push(task);
                } else {
                  taskList.push(task);
                }
              });
            }
            this.todoLists.push({
              name: todoList.title,
              id: todoList.id,
              tasks: taskList,
            });
          });
          console.log(this.todoLists);
          this.sortTasksByDay();
          // this.selectedTodoList.setValue(this.todoLists[0]);
        }
      });
  }

  sortTasksByDay() {
    var dateConvert: Date;
    this.weekTasks = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
    this.todoLists.forEach((taskList) => {
      for (let i = 0; i < taskList.tasks.length; i++) {
        const task = taskList.tasks[i];

        // checking if task dueDate is in ISO 8601 format 
        if (typeof(task.dueDate) === 'string')
          dateConvert = parseISO(task.dueDate);
        else 
          dateConvert = task.dueDate
        
        // compare to each current day of week
        for (let j = 0; j < this.weekDates.length; j++) {
          if (isSameDay(dateConvert, this.weekDates[j])) {
            console.log("true")
            this.weekTasks[j].push(task);
            break;
          }
        }
      }
    });
    console.log(this.weekTasks);
  }

  createID(index) {
    console.log(index);
  }

  drop(event: CdkDragDrop<string[]>, index: BigInteger) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateTask(event, index);
    }
  }

  updateTask(event, index) {
    const updatedTask = event.container.data[event.currentIndex];
    console.log(updatedTask);
    updatedTask.dueDate = this.weekDates[index];

    this.taskService.addTasksInTodoList(updatedTask).subscribe(
      (response) => {
        updatedTask.id = response.id;
        this.ngOnInit();
        // console.log(this.weekTasks);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  formatDate(task) {
    console.log(task.dueDate)
    if (typeof(task.dueDate) === 'string')
      return format(parseISO(task.dueDate), "h:mm aa")
    else 
      return format(parse(task.dueDate, 'EEE MMM d yyyy', new Date()), "EEE MMM");
  }
}
