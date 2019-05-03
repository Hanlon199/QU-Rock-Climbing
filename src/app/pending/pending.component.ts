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
  private hideRow:any = [];
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
				 this.loading = false;
			});

      this.authService.getPendingUsername().subscribe((res:any)=>{
        let resParsed = JSON.parse(res._body);
        this.adminApps = [];
        resParsed.data.map(e=>{
          this.adminApps.push(new Auth(e._id,e.username,e.password,e.status));
        })
      })
  	}
  	approve(index,type){
  		this.loadingButton = true;
  		this.loadingButtonID = index;
      this.hideRow[index] = true;
      if (type =='member') {
  		  this.applicants[index]["isAdmin"] = false;
    		this.userService.addUser(this.applicants[index]).subscribe((res:any)=>{
          this.userService.add_subject.next();
      		this.applicantService.removeApplicant(this.applicants[index]._id).subscribe((res:any)=>{
            this.loadingButton = false;
            this.loadingButtonID = -1;
            console.log("ABOUT TO RELOAD")
            this.load();
          });
        });
      }else{
        this.authService.editAdmin(this.adminApps[index]).subscribe((res:any)=>{this.authService.add_subject.next();
    		  this.loadingButton = false;
      		this.loadingButtonID = -1;
    		  this.load();
        });
      }
  	}

  	deny(index,type){
  		this.loadingButton = true;
  		this.loadingButtonID = index;
      this.hideRow[index] = true;

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
