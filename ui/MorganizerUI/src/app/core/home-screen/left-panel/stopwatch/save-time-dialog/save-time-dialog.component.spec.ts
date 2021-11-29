import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTimeDialogComponent } from './save-time-dialog.component';

describe('SaveTimeDialogComponent', () => {
  let component: SaveTimeDialogComponent;
  let fixture: ComponentFixture<SaveTimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveTimeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
