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
      {'name': 'Climb 1', 'photo': '', 'desc': 'new climb baby', 'register': ''},
      {'name': 'Climb 2', 'photo': '', 'desc': 'another climb baby', 'register': ''},
      {'name': 'Climb 3', 'photo': '', 'desc': 'final climb baby', 'register': ''}
    ];
  }

  ngOnInit() {
  }

}
