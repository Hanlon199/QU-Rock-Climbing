import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {eventAttendent} from '../includes/models/eventAttendent.model';
import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonAttendentService{
	public eventAttendentList: eventAttendent[];
	public add_subject = new Subject<String>()
	constructor(private http:Http){
		this.eventAttendentList = [];
	}

	addEventAttendent(eventAttendent){
		return this.http.post('/api/Attendent', 
		{"eventApplicant":
			{
            "_eventId": eventAttendent._eventId,
			"name":eventAttendent.name,
			"member":eventAttendent.member,
			"belayCert":eventAttendent.belayCert,
			"driver":eventAttendent.driver
			}
		});
	}

	removeApplicant(memberID){
		return this.http.delete('/api/Attendent/' + memberID);
	}

	getApplicants(){
		return this.http.get('/api/Attendent', {})
	}
}