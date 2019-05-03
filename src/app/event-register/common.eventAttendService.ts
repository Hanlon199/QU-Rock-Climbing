import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {EventAttendent} from '../includes/models/eventAttendent.model';
import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonEventAttendService{
	public eventAttend: EventAttendent[];
	public add_subject = new Subject<String>()
	constructor(private http:Http){
		this.eventList = [];
	}

	addEvent(event){
		return this.http.put('/api/Attendent', 
		{"eventAttend":
			{
			"eventId" : event.eventId,
			"memberId" : event.memberId,
			"name" : event.name,
			"member" : event.member,
			"belayCert" : event.belayCert,
			"driver" : event.driver
			}
		});
	}

	removeEvent(eventID){
		return this.http.delete('/api/Attendent/'+ eventID);
	}

	getEvent(){
		return this.http.get('/api/Attendent', {})
	}

	editEvent(event){
		return this.http.post('/api/Attendent', 
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