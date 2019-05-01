import { Component, OnInit } from '@angular/core';
import {CommonAuthService} from '../login/common.loginAuthService';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
	private newAdmin:any = [];
  	constructor(private authService: CommonAuthService) { }

  	ngOnInit() {
  	}

  	adminApply(){
  		this.newAdmin.status = 'pending';
  		this.authService.addUsername(this.newAdmin).subscribe((res:any)=>{
  			this.authService.add_subject.next();
  		})
  		console.log(this.newAdmin)
  	}

}
