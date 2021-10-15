import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// allows navigation between views
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
// component that pops up when clicking profile button
import { UserAccountComponent } from 'src/app/user-account/user-account.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // loggedIn is used by the component and ngIf
  loggedInUser: any;
  showTaskPanel: boolean = false;
  constructor(
    private storeService: StoreService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    // subscribes to storeService to change value of loggedInUser and showTaskPanel if it changes anywhere else in the UI
    this.storeService.loggedInUserChange.subscribe((value) => {
      this.loggedInUser = value;
    });
    this.storeService.showTaskPanelEmitter.subscribe((value) => {
      this.showTaskPanel = value;
    });
  }
  logOut() {
    // this.storeService.loggedInUserChange.unsubscribe();
    this.loggedInUser = undefined;
    sessionStorage.removeItem('user');
    this.router.navigate(['login']);
  }
  openAccountDialog() {
    this.dialog.open(UserAccountComponent, {
      height: '60%',
      width: '50%',
    });
  }

  toggleTaskPanel(){
    this.showTaskPanel = !this.showTaskPanel;
    // lets everything subscribed to the emitter that showTaskPanel has changed values
    this.storeService.showTaskPanelEmitter.next(this.showTaskPanel);
  }
}
