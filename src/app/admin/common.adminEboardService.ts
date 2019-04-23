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
		this.eboardList = [];
	}

	addEboard(formData){
		return this.http.put('/api/Eboard', formData);
	}

	removeEboard(memberID){
		return this.http.delete('/api/Eboard/' + memberID);
	}

	getEboard(){
		return this.http.get('/api/Eboard', {})
	}

	editEboard(user){
		// console.log("COMMON SERVICE EDIT: " , user)
		return this.http.post('/api/Eboard', 
		{
		"eboard":
			{
			"id":user.id,
			"eboardImage": user.photo,
			"description": user.description,
			"position": user.position,
			"name": user.name
			}
		});
	}
}