import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit {
	width: number = 1920;
	public innerWidth: any;
	public innerHeight: any;
  	images = [1, 2, 3].map((currElement,index) => 'src/app/includes/images/home/image' + currElement + '.jpg');
  
  	constructor() { }

  	ngOnInit() {  
			this.innerHeight = window.innerHeight - 55;
			this.innerWidth = window.innerWidth;
		}

}
