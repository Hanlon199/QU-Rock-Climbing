import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Event} from '../includes/models/event.model';
import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonEventService{
	public eventList: Event[];
	public add_subject = new Subject<String>()
	constructor(private http:Http){
		this.eventList = [];
	}

	addEvent(event){
		return this.http.put('/api/Event', 
		{"event":
			{
			"name":event.name,
			"description":event.description,
			"location":event.location,
			"time": event.time,
			"date": event.date
			}
		});
	}

	removeEvent(eventID){
		return this.http.delete('/api/Event/'+ eventID);
	}

	getEvent(){
		return this.http.get('/api/Event', {})
	}

	editEvent(event){
		return this.http.post('/api/Event', 
		{"event":
			{
			"id":event.id,
			"name":event.name,
			"description":event.description,
			"location":event.location,
			"time": event.time,
			"date": event.date
			}
		});
	}
}