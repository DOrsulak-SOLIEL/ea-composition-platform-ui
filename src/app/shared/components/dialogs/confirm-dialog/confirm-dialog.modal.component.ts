import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: 'confirm-dialog.modal.component.html',
  styleUrls: ['./confirm-dialog.modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  packageData: any;
  title = '';
  msg = '';
  isConfirm = false; // true = only confirm option, false = confirm and cancel options
  yesText = '';
  noText = 'Cancel';

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { model?: any }
  ) {}

  ngOnInit(): void {
    this.packageData = this.dialogData.model;
    this.title = this.packageData.title || 'Confirm Action';
    this.msg = this.packageData.message || 'Are you Sure?';
    this.isConfirm = this.packageData.isConfirm;
    this.yesText = this.packageData.yesText || 'Confirm';
    this.noText = this.packageData.noText || 'Cancel';
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
