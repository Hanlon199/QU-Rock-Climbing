import { Component, OnInit } from '@angular/core';
import {CommonApplicantService} from './common.applicantService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
	private applicant:any = []; 
  	constructor(private applicantService:CommonApplicantService, public router: Router) { }

  	ngOnInit() {
  	}


  	apply(){
  		this.applicantService.addApplicant(this.applicant).subscribe(res=>{
        this.applicantService.add_subject.next();
      });
			this.applicant = [];
			
			this.router.navigate(['/home'])
			alert("Successful application");
		}


}
