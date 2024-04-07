import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit {
  entries:any=[
    {
      "id":"1",
    "name":"best user"},
    {
      "id":"2",
      "name":"oldest entry"},
      {
        "id":"3",
        "name":"new entry"},
  ]
  users:any=[
    {
           "user":"user1",
   "email":"abc@123",
   "type":"R",
  "date":"06-03-2023",
   "points":"2",
    "result":"20",
  },
  {
       "user":"user2",
 "email":"def@123",
 "type":"R",
"date":"06-03-2023",
 "points":"3",
  "result":"11.1",
},
{
    "user":"user3",
"email":"hij@123",
"type":"R",
"date":"06-03-2023",
"points":"5",
"result":"88.7",
},
{
  "user":"user4",
"email":"klm@123",
"type":"R",
"date":"06-03-2023",
"points":"4",
"result":"22.5",
},
  ]
  constructor() { }

  ngOnInit(): void {
  }
//To select all checkboxes
checkAllCheckBox(ev: any) { 
  this.users.forEach((x: { checked: any; }) => x.checked = ev.target.checked)
}
//select particular checkbox
isAllCheckBoxChecked() {
  return this.users.every((user: { checked: any; }) => user.checked);
}
}
