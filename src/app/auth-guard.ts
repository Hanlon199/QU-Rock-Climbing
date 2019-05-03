import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public router: Router, public jwtHelper: JwtHelperService) { }

    canActivate(): boolean {
        if (!this.jwtHelper.isTokenExpired()) {
            return true
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}