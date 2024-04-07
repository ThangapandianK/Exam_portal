import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  questions:any=[
    {
      "username":"user1",
    "question1":"---",
    "question2":"---",
    "date":"06-03-2023",
    "correct":"2(40%)",
    "incorrect":"3(60%)",
    "solved":"5 of 5",
    "points":"2",
    "result":"20%",
  },
  {
    "username":"user2",
  "question1":"---",
  "question2":"---",
  "date":"05-03-2023",
  "correct":"1(20%)",
  "incorrect":"4(80%)",
  "solved":"4 of 5",
  "points":"1",
  "result":"10%",
},
{
  "username":"user3",
"question1":"---",
"question2":"---",
"date":"04-03-2023",
"correct":"5(100%)",
"incorrect":"0(0%)",
"solved":"5 of 5",
"points":"5",
"result":"100%",
},
{
  "username":"user4",
"question1":"---",
"question2":"---",
"date":"01-03-2023",
"correct":"3(70%)",
"incorrect":"2(30%)",
"solved":"5 of 5",
"points":"3",
"result":"20%",
},
    
  ]
  users:any=[
    {
      "id":"1",
    "name":"all users"},
    {
      "id":"2",
      "name":"only registerd users"},
      {
        "id":"3",
        "name":"only anonymous users"},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
