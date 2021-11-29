import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-time-dialog',
  templateUrl: './save-time-dialog.component.html',
  styleUrls: ['./save-time-dialog.component.scss']
})
export class SaveTimeDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SaveTimeDialogComponent>) { }

  ngOnInit(): void {
  }

  saveConfirm() {
    this.dialogRef.close("save");
  }
}
