export class User{
	constructor(
		public id : string,
		public name : string,
		public email : string,
		public year : number,
		public belayCertified : boolean,
		public position : string,
		public isAdmin : boolean 
	){}
}