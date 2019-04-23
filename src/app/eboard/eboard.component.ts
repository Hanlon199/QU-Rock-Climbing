import { Component, OnInit } from '@angular/core';
import {Eboard} from '../includes/models/eboard.model';
import {CommonEboardService} from '../admin/common.adminEboardService';

@Component({
  selector: 'app-eboard',
  templateUrl: './eboard.component.html',
  styleUrls: ['./eboard.component.css']
})
export class EboardComponent implements OnInit {
	private eboardList:Eboard[];
	private loading:boolean = true;
  constructor(private eboardService:CommonEboardService) { }


  ngOnInit() {
  	this.eboardService.getEboard().subscribe((res:any) =>{	
		let resParsed = JSON.parse(res._body);
		this.eboardList = [];
		resParsed.data.map(e=>{
			this.eboardList.push(new Eboard(e._id,e.photo.split('\\')[3],e.description,e.position, e.name, e.order));
		})
		console.log(this.eboardList)
		this.loading = false;
	})
  }

}
