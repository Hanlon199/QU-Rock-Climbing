import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import {CommonService} from '../common.service';
import {Http,Response, Headers, RequestOptions} from '@angular/http';
import {User} from '../includes/models/user.model';

@Component({
  selector: 'app-test-user',
  templateUrl: './test-user.component.html',
  styleUrls: ['./test-user.component.scss']
})
export class TestUserComponent implements OnInit {
	private user = [];
	private userList: User[];
	private editUserList:any = [];
	private loading = true;
	private edit:any = -1;
	constructor(private service:CommonService){}

	ngOnInit(){
		this.getAllUsers()

		this.service.add_subject.subscribe(response =>{
			this.getAllUsers();
		});
	}

	getAllUsers(){
		this.service.getUser().subscribe((res:any) =>{
			let resParsed = JSON.parse(res._body);
			console.log("RES: ", resParsed.data);
			this.userList = [];
			resParsed.data.map(e=>{
				this.userList.push(new User(e._id,e.name,e.year,e.belayCertified,e.position,e.isAdmin));
			})
			this.loading = false;
			// console.log("USER LIST: ", this.userList)
		})
	}

	addUser(){
		this.service.addUser(this.user).subscribe(res=>{
			this.service.add_subject.next();
		});
		this.user = [];
	}

	//when showing edit set edit user list to the selct user.
	showEdit(id){
		this.edit = id;
		this.editUserList = this.userList[id];
	}

	cancelEdit(){
		this.edit = -1;
		this.editUserList = [];
	}

	submitEdit(){
		this.service.editUser(this.editUserList).subscribe(res=>{
			this.service.add_subject.next();
		});
		this.cancelEdit();
	}

	delete(id, name){
		let action = confirm(`Are you sure you wish to delete member: ${name}`);	
		if (action) {
		this.service.removeUser(id).subscribe(res=>{
			this.service.add_subject.next();
		});
		this.getAllUsers();
		}
		
	}
	//implement delete


}

