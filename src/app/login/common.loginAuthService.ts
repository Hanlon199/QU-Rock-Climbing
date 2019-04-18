import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Auth } from '../includes/models/auth.model';
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonAuthService {
    public authList: Auth[];
    public add_subject = new Subject<String>()
    constructor(private http: Http) {
        this.authList = [];
    }

    getUsername() {
        return this.http.get('/api/Auth', {})
    }

    addUsername(username) {
        return this.http.put('/api/Auth/add',
            {
                "member":
                {
                    "username": username.username,
                    "password": username.password
                }
            });
    }
    compareUsername(username) {
        return this.http.put('/api/Auth/check',
            {
                "member":
                {
                    "username": username.username,
                    "password": username.password
                }
            });
    }
}