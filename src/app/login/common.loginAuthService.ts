import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Eboard } from '../includes/models/eboard.model';
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonAuthService {
    public authList: Eboard[];
    public add_subject = new Subject<String>()
    constructor(private http: Http) {
        // console.log(this.http)
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
                    "photo": username.photo,
                    "description": username.description,
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
                    "photo": username.photo,
                    "description": username.description,
                    "username": username.username,
                    "password": username.password
                }
            });
    }
}