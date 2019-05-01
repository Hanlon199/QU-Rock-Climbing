import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit {
	height: number = 867;
	width: number = 1920;
  	images = [1, 2, 3].map((currElement,index) => 'src/app/includes/images/home/image' + currElement + '.jpg');
  
  	constructor() { }

  	ngOnInit() {  }

}
