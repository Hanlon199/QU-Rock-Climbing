import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: any;

  constructor() {
    this.events = [
      {'name': 'Climb 1', 'desc': 'new climb baby', 'register': 'Register'},
      {'name': 'Climb 2', 'desc': 'another climb baby', 'register': 'Register'},
      {'name': 'Climb 3', 'desc': 'final climb baby', 'register': 'Register'}
    ];
  }

  ngOnInit() {
  }

}
