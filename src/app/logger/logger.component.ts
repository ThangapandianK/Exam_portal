import { Component, OnInit } from '@angular/core';
import { CommanService } from '../Shared/service/comman.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss']
})
export class LoggerComponent implements OnInit {

  ExceptionLogger:any;
  fromDate:any;
  toDate:any;
  constructor(private commonService: CommanService) { }

  ngOnInit(): void {
    this.getLogger()
    this.fromDate = this.getCurrentDate();
    this.toDate = this.getCurrentDate();
  }

  getLogger() {
    this.commonService.getAllLogger().subscribe((res: any) => {
      this.ExceptionLogger = res
     
    })
  }

  getByStartEndDate() {
    this.commonService.getStartDateEndDateLogger(this.fromDate, this.toDate).subscribe(data => { 
      this.ExceptionLogger = data;
    })
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getDate() {
    this.commonService.getStartDateEndDateLogger(this.fromDate,this.toDate).subscribe((data: any) => {
    });
  }

}
