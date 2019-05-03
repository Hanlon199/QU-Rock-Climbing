import { Component, OnInit, Input } from '@angular/core';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { UtilityService } from '../utility.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() logged:boolean;
  images = [1].map((currElement, index) => 'src/app/includes/images/logo.png');

  constructor(public utilityService: UtilityService) { 
  }
  
  ngOnInit() {
  }

  public logout() {
    sessionStorage.removeItem('SESSIONID');
    this.utilityService.updateLoggedIn();
  }

}
