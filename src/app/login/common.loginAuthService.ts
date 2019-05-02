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

    getPendingUsername() {
        return this.http.get('/api/Auth/pending', {})
    }

    getAllUsername() {
        return this.http.get('/api/Auth/all', {})
    }

    addUsername(username) {
        return this.http.put('/api/Auth',
            {
                "user":
                {
                    "username": username.username,
                    "password": username.password,
                    "status": username.status
                }
            });
    }
    compareUsername(username) {
        return this.http.post('/api/Auth/check',
            {
                "user":
                {
                    "username": username.username,
                    "password": username.password
                }
            });
    }

    editAdmin(username) {
        console.log("COMMON: " ,username)
        return this.http.post('/api/Auth',
            {
                "user":
                {
                    "id": username.id,
                    "username": username.username,
                    "password": username.password,
                    "status": 'approved'
                }
            });
    }

    removeUser(id) {
        return this.http.delete('/api/Auth/' + id);
    }
}