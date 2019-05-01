export class Applicant{
	constructor(
		public _id : any,
		public name : string,
		public email : string,
		public year : number,
		public belayCertified : boolean,
		public position : string,
		public reasoning:string
	){};
}