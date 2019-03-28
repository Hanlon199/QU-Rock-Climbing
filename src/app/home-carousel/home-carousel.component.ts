import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit {
	height: number = 640;
	width: number = 1920;
  	images = [1, 2, 3].map((currElement,index) => 'src/app/includes/images/image' + currElement + '.jpg');
  
  	constructor() { }

  	ngOnInit() {  }

}
