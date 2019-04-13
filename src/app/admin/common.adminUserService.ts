import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {User} from '../includes/models/user.model';
import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonUserService{
	public userList: User[];
	public add_subject = new Subject<String>()
	constructor(private http:Http){
		// console.log(this.http)
		this.userList = [];
	}

	addUser(user){
		// console.log("COMMON USER ADD: ", user)
		return this.http.put('/api/User', 
		{"member":
			{
			"name":user.name,
			"email":user.email,
			"year":user.year,
			"belayCertified":user.belayCertified,
			"position": user.position,
			"isAdmin":user.isAdmin
			}
		});
	}

	removeUser(memberID){
		return this.http.delete('/api/User/' + memberID);
	}

	getUser(){
		return this.http.get('/api/User', {})
	}

	editUser(user){
		// console.log("COMMON SERVICE EDIT: " , user)
		return this.http.post('/api/User', 
		{
		"member":
			{
			"id":user.id,
			"name":user.name,
			"email":user.email,
			"year":user.year,
			"belayCertified":user.belayCertified,
			"position": user.position,
			"isAdmin":user.isAdmin
			}
		});
	}
}