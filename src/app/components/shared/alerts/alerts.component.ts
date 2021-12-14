import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styles: [
  ]
})
export class AlertsComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;

  error:boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
