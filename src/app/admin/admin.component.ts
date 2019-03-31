import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import {CommonUserService} from './common.adminUserService';
import {CommonEventService} from './common.adminEventService';
import {Http,Response, Headers, RequestOptions} from '@angular/http';
import {User} from '../includes/models/user.model';
import {Event} from '../includes/models/event.model';
import {News} from '../includes/models/news.model';
import {Eboard} from '../includes/models/eboard.model';

@Component({
  selector: 'admin_user',
  template: `
    <div>
      <ng-container [ngTemplateOutlet]="myTemplate"></ng-container>
    </div>`
})
export class ChildComponent {
  @Input() myTemplate: 'admin.user.html';
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	private user = [];
	private news = [];
	private events = [];
	private eboard = [];
	private userList: User[];
	private newsList: News[];
	private eventsList: Event[];
	private eboardList: Eboard[];
	private editList:any = [];
	private loading = true;
	private edit:any = -1;
	private currentTab:string='members';
	constructor(private userService:CommonUserService, private eventService: CommonEventService) {}
  	ngOnInit() {
  		this.getAll()

		this.userService.add_subject.subscribe(response =>{
			this.getAll();
		});
  	}

	getAll(){
		this.loading = true;
		switch (this.currentTab) {
			case "members":
				this.userService.getUser().subscribe((res:any) =>{	
					let resParsed = JSON.parse(res._body);
					console.log("RES: ", resParsed.data);
					this.userList = [];
					resParsed.data.map(e=>{
						this.userList.push(new User(e._id,e.name,e.belayCertified,e.year,e.position,e.isAdmin));
					})
					this.loading = false;
					// console.log("USER LIST: ", this.userList)
				})
				break;
			case "events":
				this.eventService.getEvent().subscribe((res:any) =>{	
					let resParsed = JSON.parse(res._body);
					console.log("RES: ", resParsed.data);
					this.eventsList = [];
					resParsed.data.map(e=>{
						this.eventsList.push(new Event(e._id,e.name,e.description,e.location,e.time));
					})
					this.loading = false;
					console.log("EVENT LIST: ", this.eventsList)
				})
				break;
			
			default:
				// code...
				break;
		}
		
	}

	add(){
		switch (this.currentTab) {
			case "members":
				this.userService.addUser(this.user).subscribe(res=>{
					this.userService.add_subject.next();
				});
				this.user = [];
				break;
			case "events":
				this.eventService.addEvent(this.events).subscribe(res=>{
					this.eventService.add_subject.next();
				});
				this.events = [];
				break;
			
			default:
				// code...
				break;
		}
	}

	delete(id, detail){
		switch (this.currentTab) {
			case "members":
				let action = confirm(`Are you sure you wish to delete member: ${detail}`);	
				if (action) {
				this.userService.removeUser(id).subscribe(res=>{
					this.userService.add_subject.next();
				});
				this.getAll();
				}
				break;
			case "events":
				let action2 = confirm(`Are you sure you wish to delete the event: ${detail}`);	
				if (action) {
				this.eventService.removeEvent(id).subscribe(res=>{
					this.eventService.add_subject.next();
				});
				this.getAll();
				}
				break;
			default:
				// code...
				break;
		}
		
	}
	//when showing edit set edit user list to the selct user.
	showEdit(id){
		this.edit = id;
		switch (this.currentTab) {
			case "members":
				this.editList = this.userList[id];
				break;
			case "events":
				this.editList = this.eventsList[id];
				break;
			
			default:
				// code...
				break;
		}
	}

	cancelEdit(){
		this.edit = -1;
		this.editList = [];
	}

	submitEdit(){
		switch (this.currentTab) {
			case "members":
				this.userService.editUser(this.editList).subscribe(res=>{
					this.userService.add_subject.next();
				});
				break;
			case "events":
				this.eventService.editEvent(this.editList).subscribe(res=>{
					this.eventService.add_subject.next();
				});
				break;
			default:
				// code...
				break;
		}
		this.cancelEdit();
	}


	changeTab(tab:any){
		this.currentTab = tab;
		this.getAll();
		console.log("TAB: " , this.currentTab)
	}

}