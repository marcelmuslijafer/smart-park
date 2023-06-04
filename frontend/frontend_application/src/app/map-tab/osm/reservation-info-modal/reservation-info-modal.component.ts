import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-reservation-info-modal',
  templateUrl: './reservation-info-modal.component.html',
  styleUrls: ['./reservation-info-modal.component.css'],
})
export class ReservationInfoModalComponent implements OnInit {
  title: string;
  content: string;

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: InfoModalData
  ) {
    this.title = data.title;
    this.content = data.content;
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.content = this.data.content;
  }
}

export interface InfoModalData {
  title: string;
  content: string;
}
