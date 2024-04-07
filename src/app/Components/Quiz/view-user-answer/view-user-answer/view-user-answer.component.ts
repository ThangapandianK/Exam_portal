import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-user-answer',
  templateUrl: './view-user-answer.component.html',
  styleUrls: ['./view-user-answer.component.scss']
})
export class ViewUserAnswerComponent implements OnInit {
  
 results:any=[
  {
    "email":"dsg@dft",
    "name":"asd",
    "phone":"23456",
    "points":"12"
  },
  {
    "email":"fhfg@dtgf",
    "name":"bnk,",
    "phone":"67878",
    "points":"7"
  },
  {
    "email":"dfgdf@dg",
    "name":"asd",
    "phone":"2345",
    "points":"4"
  },
 ];

  constructor() { }

  ngOnInit(): void {
  }
viewdetail(){

}
viewdetails(){

}

}
