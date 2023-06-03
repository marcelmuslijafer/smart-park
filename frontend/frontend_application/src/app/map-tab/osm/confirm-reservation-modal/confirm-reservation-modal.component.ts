import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-reservation-modal',
  templateUrl: './confirm-reservation-modal.component.html',
  styleUrls: ['./confirm-reservation-modal.component.css'],
})
export class ConfirmReservationModalComponent {
  title: string;
  content: string;
  returnData: {
    parkingSpaceId: string;
  };

  constructor(
    public dialogRef: MatDialogRef<ConfirmReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationModalData
  ) {
    this.title = data.title;
    this.content = data.content;
    this.returnData = { ...data.returnData };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface ConfirmationModalData {
  title: string;
  content: string;
  returnData: {
    parkingSpaceId: string;
  };
}
