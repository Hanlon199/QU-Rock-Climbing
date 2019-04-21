import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Eboard} from '../includes/models/eboard.model';
import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonEboardService{
	public eboardList: Eboard[];
	public add_subject = new Subject<String>()
	constructor(private http:Http){
		// console.log(this.http)
		this.eboardList = [];
	}

	addEboard(user){
		console.log("COMMON USER ADD: ", user)
		return this.http.post('/api/Eboard', 
		{"eboard":
			{
			"photo": user.photo,
			"description": user.description
			}
		});
	}

	removeEboard(memberID){
		return this.http.delete('/api/Eboard/' + memberID);
	}

	getEboard(){
		return this.http.get('/api/Eboard', {})
	}

	editEboard(user){
		// console.log("COMMON SERVICE EDIT: " , user)
		return this.http.put('/api/Eboard', 
		{
		"eboard":
			{
			"id":user.id,
			"photo": user.photo
			}
		});
	}
}