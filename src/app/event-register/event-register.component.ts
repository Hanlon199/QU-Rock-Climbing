import { Component, OnInit } from '@angular/core';
import {CommonUserService} from '../admin/common.adminUserService';
import {CommonEventAttendService} from 'src/app/event-register/common.eventAttendService';
import {User} from '../includes/models/user.model';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.scss']
})
export class EventRegisterComponent implements OnInit {
	private userList:any; 
	private loading:boolean = true; 
	private selected:any = []; 
	private eventID:any; 
	constructor(private activatedRoute: ActivatedRoute,private userService: CommonUserService,private eventAttendService: CommonEventAttendService, public router: Router) { }

	ngOnInit() {
		 this.activatedRoute.params.subscribe(params => {
	        this.eventID = params['id'];
	      });


		this.userService.getUser().subscribe((res:any)=>{
			let resParsed = JSON.parse(res._body);
			this.userList = [];
			resParsed.data.map(e=>{
				this.userList.push(new User(e._id,e.name,e.email,e.year,e.belayCertified,e.position,e.isAdmin));
			})
			console.log(this.userList)
			this.loading = false;
		})
	}


	submitRegistration(){
		let temp = this.selected["name"].split('@@@')
		this.selected["name"] = temp[0];
		this.selected["memberId"] = temp[1];
		this.selected["eventId"] = this.eventID;
		this.eventAttendService.addEvent(this.selected).subscribe((res:any)=>{
			
		})
		this.router.navigate(['/home'])
		alert("Successful Registration");
	}



}
