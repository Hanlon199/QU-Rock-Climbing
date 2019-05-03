import {Injectable} from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UtilityService{
    constructor(public jwtHelper: JwtHelperService){

    }
    public loggedIn = false;

    updateLoggedIn(){
        console.log("called");
        if (!this.jwtHelper.isTokenExpired()) {
            this.loggedIn = true;
          } else {
            this.loggedIn = false;
          }
          console.log(this.loggedIn);
        }
}