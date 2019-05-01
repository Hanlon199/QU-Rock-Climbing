import { Component, OnInit } from '@angular/core';
import {CommonApplicantService} from '../apply/common.applicantService';
import {CommonUserService} from '../admin/common.adminUserService';
import {CommonAuthService} from '../login/common.loginAuthService';
import {Applicant} from '../includes/models/applicant.model';
import {Auth} from '../includes/models/auth.model';
@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {
	private applicants: Applicant[];
  private adminApps: Auth[];
	private loading:boolean = true;
	private loadingButton:boolean = false;
	private loadingButtonID:number = -1;
  	constructor(private applicantService: CommonApplicantService, private userService: CommonUserService, private authService: CommonAuthService) { }

  	ngOnInit() {
  		this.load();
  	}

  	load(){
  		this.applicantService.getApplicants().subscribe((res:any)=>{
  			let resParsed = JSON.parse(res._body);
				this.applicants = [];
				resParsed.data.map(e=>{
					this.applicants.push(new Applicant(e._id,e.name,e.email,e.year,e.belayCertified,'member',e.reasoning));
				})
			});

      this.authService.getUsername().subscribe((res:any)=>{
        let resParsed = JSON.parse(res._body);
        this.adminApps = [];
        resParsed.data.map(e=>{
          this.adminApps.push(new Auth(e._id,e.username,e.password,e.status));
        })
				this.loading = false;
      })
  	}
  	approve(index,type){
  		this.loadingButton = true;
  		this.loadingButtonID = index;
  		this.applicants[index]["isAdmin"] = false;
      if (type =='member') {
    		this.userService.addUser(this.applicants[index]).subscribe(res=>{this.userService.add_subject.next();});
    		this.applicantService.removeApplicant(this.applicants[index]._id).subscribe(res=>{this.applicantService.add_subject.next();});
      }else{
        this.authService.editAdmin(this.adminApps[index]).subscribe((res:any)=>{this.authService.add_subject.next();});
      }
		  this.load();
		  this.loadingButton = false;
  		this.loadingButtonID = -1;
  	}

  	deny(index,type){
  		this.loadingButton = true;
  		this.loadingButtonID = index;
      if (type =='member') {
  		  this.applicantService.removeApplicant(this.applicants[index]._id).subscribe(res=>{this.applicantService.add_subject.next();});
      }else{
        this.authService.removeUser(this.adminApps[index].id).subscribe((res:any)=>{this.authService.add_subject.next();});
      }
		  this.load();
		  this.loadingButton = false;
  		this.loadingButtonID = -1;


  	}



}
