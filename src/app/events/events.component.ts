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
    this.eventService.getEvent().subscribe((res:any) => {
      let resParsed = JSON.parse(res._body);
      this.eventList = [];
      resParsed.data.map(e => {
        this.eventList.push(new Event(e._id, e.name, e.description, e.location, e.time, e.date));
      });
      this.loading = false;
    })
  }
}
