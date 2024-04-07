import { Component, OnInit } from '@angular/core';

import { CommanService } from '../../../../../src/app/Shared/service/comman.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public doughnutData: any;
  public pieData: any;

  public candidateCount: any;
  public quizCount: any;
  constructor(private service: CommanService) {
    // Object.assign(this, { doughnutData, pieData })
  }
  public chart5: any

  // events
  public chartClicked(e: any): void {
  }
  public chartHovered(e: any): void {
  }


  ngOnInit(): void {
    this.userCount()
    this.quizlistCount()
  }
  //get total user count
  userCount() {
    this.service.getCandidateCount().subscribe((res: any) => {
      this.candidateCount = res
    })
  }
  //get total quiz list count
  quizlistCount() {
    this.service.getQuizCount().subscribe((data: any) => {
      this.quizCount = data
    })
  }

}
