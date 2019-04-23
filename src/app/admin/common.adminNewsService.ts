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

	addNews(news){
		return this.http.put('/api/News', 
		{"news":
			{
			"name":news.name,
			"description":news.description,
			"link":news.location
			}
		});
	}

	removeNews(newsID){
		return this.http.delete('/api/News/' + newsID);
	}

	getNews(){
		return this.http.get('/api/News', {})
	}

	editNews(news){
		return this.http.post('/api/News', 
		{"news":
			{
			"id":news.id,
			"name":news.name,
			"description":news.description,
			"link": news.link
			}
		});
	}
}