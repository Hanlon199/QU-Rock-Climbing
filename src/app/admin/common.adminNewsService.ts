import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {News} from '../includes/models/news.model';
import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonNewsService{
	public newsList: News[];
	public add_subject = new Subject<String>()
	constructor(private http:Http){
		// console.log(this.http)
		this.newsList = [];
	}

	addNews(event){
		return this.http.post('/api/addEvent', 
		{"news":
			{
			"name":event.name,
			"description":event.description,
			"link":event.location,
			}
		});
	}

	removeEvent(memberID){
		return this.http.post('/api/removeEvent',{id:memberID});
	}

	getEvent(){
		return this.http.get('/api/getEvent', {})
	}

	editEvent(event){
		return this.http.post('/api/editEvent', 
		{"event":
			{
			"id":event.id,
			"name":event.name,
			"description":event.description,
			"location":event.location,
			"time": event.time
			}
		});
	}
}