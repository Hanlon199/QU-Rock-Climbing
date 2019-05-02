import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonAuthService } from './common.loginAuthService';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private newLogin: any = [];

  constructor(private authService: CommonAuthService, public router: Router, public jwtHelper: JwtHelperService) { }

  ngOnInit() {
  }

  loginUser(e) {
    this.newLogin.username = e.target.elements[0].value;
    this.newLogin.password = e.target.elements[1].value;

    this.authService.compareUsername(this.newLogin).subscribe((res: any) => {
      var info = JSON.parse(res._body);
      if (info.status == "success") {
        sessionStorage.setItem('SESSIONID', info.token);
        this.router.navigate(['admin']);
      } else if (info.status == "fail") {
        alert("Incorrecto");
      }
      this.authService.add_subject.next();
    })
  }


}
