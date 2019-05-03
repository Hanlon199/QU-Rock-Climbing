import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Applicant} from '../includes/models/applicant.model';
import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonApplicantService{
	public applicantList: Applicant[];
	public add_subject = new Subject<String>()
	constructor(private http:Http){
		// console.log(this.http)
		this.applicantList = [];
	}

	addApplicant(applicant){
		// console.log("COMMON APP ADD: ", applicant)
		return this.http.post('/api/Applicant', 
		{"applicant":
			{
			"name":applicant.name,
			"email":applicant.email,
			"year":applicant.year,
			"belayCertified":applicant.belayCertified,
			"reasoning":applicant.reasoning
			}
		});
	}

	removeApplicant(memberID){
		return this.http.delete('/api/Applicant/' + memberID);
	}

	getApplicants(){
		return this.http.get('/api/Applicant', {})
	}
}