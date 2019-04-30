import { Component, OnInit } from '@angular/core';
import { CommonEventService } from '../admin/common.adminEventService';
import { Event } from '../includes/models/event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  private eventList:Event[];
  private loading:boolean = true;
  constructor(private eventService: CommonEventService) {}

  ngOnInit() {
  }

}
