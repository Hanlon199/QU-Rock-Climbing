import { Component, OnInit } from '@angular/core';
import {CommonUserService} from '../admin/common.adminUserService';

@Component({
  selector: 'app-event-attendent-list',
  templateUrl: './event-attendent-list.component.html',
  styleUrls: ['./event-attendent-list.component.scss']
})
export class EventAttendentListComponent implements OnInit {
	private userList:any; 
	private loading:boolean = true; 
	constructor(private userService: CommonUserService) { }

	ngOnInit() {
		this.userService.getUser().subscribe((res:any)=>{
			let resParsed = JSON.parse(res._body);
			this.userList = [];
			resParsed.data.map(e=>{
				// this.userList.push(new User(e._id,e.name,e.email,e.year,e.belayCertified,e.position,e.isAdmin));
			})
			console.log(this.userList)
			this.loading = false;
		})
	}

}
