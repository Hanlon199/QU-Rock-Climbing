import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public picHeight:any;
  public picWidth:any;

  joinUsImg = 'src/app/includes/home/joeGang.JPG';
  images = [1, 2, 3, 4].map((currElement,index) => 'src/app/includes/images/home/icon' + currElement + '.jpg');


  constructor() { }

  ngOnInit() {
    this.picHeight = window.innerHeight - 350;

  }

}
