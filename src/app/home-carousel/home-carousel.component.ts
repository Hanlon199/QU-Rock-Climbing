import { Component, OnInit, HostListener } from '@angular/core';

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

	@HostListener('window:resize', ['$event'])
	onresize(event) {
		this.innerWidth = window.innerWidth;
		this.innerHeight = window.innerHeight;
	}

}
