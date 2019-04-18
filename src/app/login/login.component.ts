import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt from 'jsonwebtoken';
import { decode } from 'punycode';
import {CommonAuthService} from './common.loginAuthService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authSerivce: CommonAuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(e) {
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    console.log(username, password);

    // if (username == 'qurockclimbing@gmail.com' && password == 'sendsonly203') {
    //   this.router.navigate(['admin']);
    // }
    var token = jwt.sign({ username: e.target.elements[0].value, password: e.target.elements[1].value }, '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb');
    console.log(token);
    var decoded = jwt.decode(token);
  }
  

}
