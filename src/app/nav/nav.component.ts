import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  images = [1].map((currElement,index) => 'src/app/includes/images/logo.png');

  constructor() { }

  ngOnInit() {
  }

}
