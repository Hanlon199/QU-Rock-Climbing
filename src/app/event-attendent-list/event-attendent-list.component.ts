import { Component, OnInit } from '@angular/core';
import {CommonUserService} from '../admin/common.adminUserService';
import {CommonEventAttendService} from '../event-register/common.eventAttendService';

@Component({
  selector: 'app-event-attendent-list',
  templateUrl: './event-attendent-list.component.html',
  styleUrls: ['./event-attendent-list.component.scss']
})
export class EventAttendentListComponent implements OnInit {
	private events:any; 
	private detail:any; 
	private loading:boolean = true; 
	private loading2:boolean = false; 
	private showDetail:boolean = false; 
	constructor(private userService: CommonUserService, private eventAttendService: CommonEventAttendService) { }

	ngOnInit() {

		this.eventAttendService.getEvent().subscribe((res:any)=>{
			let resParsed = JSON.parse(res._body);
			this.events = [];
			resParsed.data.map(e=>{
				this.events.push(e);
			})
			console.log(this.events)
			this.loading = false;
		})
	}


	public loadDetail(id){
		this.showDetail = false;
		this.loading2 = true;
		this.eventAttendService.getDetailEvent(id).subscribe((res:any)=>{
			let resParsed = JSON.parse(res._body);
			this.detail = [];
			resParsed.data.map(e=>{
				this.detail.push(e);
			})
			console.log(this.detail)
			this.loading2 = false;
			this.showDetail = true;
		})
	}

}
