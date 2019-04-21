import { Component, OnInit, Input, Injectable  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import {CommonUserService} from './common.adminUserService';
import {CommonEventService} from './common.adminEventService';
import {CommonNewsService} from './common.adminNewsService';
import {CommonEboardService} from './common.adminEboardService';
import {Http,Response, Headers, RequestOptions} from '@angular/http';
import {User} from '../includes/models/user.model';
import {Event} from '../includes/models/event.model';
import {News} from '../includes/models/news.model';
import {Eboard} from '../includes/models/eboard.model';
import {HttpClient, HttpEventType} from '@angular/common/http';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

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
	private selectedFile:File = null;
	constructor(private userService:CommonUserService, private eventService: CommonEventService, private newsService:CommonNewsService, 
		private eboardService: CommonEboardService, private http:HttpClient) {}
		
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
					// console.log("RES: ", resParsed.data);
					this.userList = [];
					resParsed.data.map(e=>{
						this.userList.push(new User(e._id,e.name,e.email,e.year,e.belayCertified,e.position,e.isAdmin));
					})
					this.loading = false;
					// console.log("USER LIST: ", this.userList)
				})
				break;
			case "events":
				this.eventService.getEvent().subscribe((res:any) =>{	
					let resParsed = JSON.parse(res._body);
					// console.log("RES: ", resParsed.data);
					this.eventsList = [];
					resParsed.data.map(e=>{
						this.eventsList.push(new Event(e._id,e.name,e.description,e.location,e.time));
					})
					this.loading = false;
					// console.log("EVENT LIST: ", this.eventsList)
				})
				break;
			case "news":
				this.newsService.getNews().subscribe((res:any) => {
					let resParsed = JSON.parse(res._body);
					this.newsList = [];
					resParsed.data.map(e=>{
						this.newsList.push(new News(e._id,e.name,e.description,e.link));
					})
					this.loading = false;
				})
				break;
			case "eboard":
				this.eboardService.getEboard().subscribe((res:any) =>{	
					let resParsed = JSON.parse(res._body);
					this.eboardList = [];
					resParsed.data.map(e=>{
						this.eboardList.push(new Eboard(e._id,e.photo));
					})
					this.loading = false;
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
			case "news":
				this.newsService.addNews(this.news).subscribe(res=>{
					this.newsService.add_subject.next();
				});
				this.news = [];
				break;
			case "eboard":
				// this.onUpload();
				const fd = new FormData();
				fd.append('eboardImage',this.selectedFile,this.selectedFile.name);
				fd.append('description',this.eboard["description"])
				// this.eboard["photo"] = fd;
				// console.log("PHOTO: " ,fd);
				console.log("Desc: " ,this.eboard["description"]);
				this.eboardService.addEboard(fd).subscribe(event=>{
					if (event.type === HttpEventType.UploadProgress) {
						console.log("Upload Progress: " + Math.round((event.loaded/event.total * 100)) + "%");
					}else if(event.type == HttpEventType.Response){
						console.log("Image Upload");
					}
				})
				// this.http.put('/api/Eboard', fd, {
				// 	reportProgress: true,
				// 	observe: 'events'
				// })
				// .subscribe(event=>{
				// 	if (event.type === HttpEventType.UploadProgress) {
				// 		console.log("Upload Progress: " + Math.round((event.loaded/event.total * 100)) + "%");
				// 	}else if(event.type == HttpEventType.Response){
				// 		console.log("Image Upload");
				// 	}
				// })
				this.eboard = [];
				this.selectedFile = null;
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
				if (action2) {
					this.eventService.removeEvent(id).subscribe(res=>{
						this.eventService.add_subject.next();
				});
				this.getAll();
				}
				break;
			case "news":
				let action3 = confirm(`Are you sure you wish to delete this news: ${detail}`);
				if (action3) {
					this.newsService.removeNews(id).subscribe(res => {
						this.newsService.add_subject.next();
					});
					this.getAll();
				}
				break;
			case "eboard":
				let action4 = confirm(`Are you sure you wish to delete member: ${detail}`);	
				if (action4) {
					this.eboardService.removeEboard(id).subscribe(res=>{
						this.eboardService.add_subject.next();
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
			case "news":
				this.editList = this.newsList[id];
				break;
			case "eboard":
				this.editList = this.eboardList[id];
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
			case "news":
				this.newsService.editNews(this.editList).subscribe(res => {
					this.newsService.add_subject.next();
				});
				break;
			case "eboard":
				this.eboardService.editEboard(this.editList).subscribe(res=>{
					this.eboardService.add_subject.next();
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

	export(){
		
		let data = [];
		let name = '';
		let today = new Date();
		let todayParsed = String(today.getMonth()).padStart(2,'0') + '/' + String(today.getDate()).padStart(2,'0') + '/' + String(today.getFullYear());

		switch (this.currentTab) {
			case "members":
				name = 'members_export_'
				data = this.userList;
				break;
			case "events":
				name = 'events_export_'
				data = this.eventsList;
				break;
			case "news":
				name = 'news_export_'
				data = this.newsList;
				break;
			case "eboard":
				name = 'eboard_export_'
				data = this.eboardList;
				break;
			default:
				break;
		}

		name = name + todayParsed + '.xlsx';

		const workBook = XLSX.utils.book_new(); // create a new blank book
    	const workSheet = XLSX.utils.json_to_sheet(data);
    	XLSX.utils.book_append_sheet(workBook, workSheet, 'data'); // add the worksheet to the book
    	XLSX.writeFile(workBook, name);
		// this.exportAsExcelFile(data,name);
	}

	onFileSelected(event){
		console.log(event);
		this.selectedFile = <File>event.target.files[0];
	}

	onUpload(){
		// const fd = new FormData();
		// fd.append('image',this.selectedFile,this.selectedFile.name);
		// this.http.put('/api/Eboard/image', fd, {
		// 	reportProgress: true,
		// 	observe: 'events'
		// })
		// .subscribe(event=>{
		// 	if (event.type === HttpEventType.UploadProgress) {
		// 		console.log("Upload Progress: " + Math.round((event.loaded/event.total * 100)) + "%");
		// 	}else if(event.type == HttpEventType.Response){
		// 		console.log("Image Upload");
		// 	}
		// })
	}

}	