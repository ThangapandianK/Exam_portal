import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommanService } from '../Shared/service/comman.service';
import * as XLSX from 'xlsx'; // for download the ExcelSheet
import * as FileSaver from 'file-saver';// for download the ExcelSheet
import { EXCEL_EXTENSION, EXCEL_TYPE } from '../Shared/constant/constant';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {
  batchList: any;
  CandidateDetails: any;
  batch: any;
  isDisabled: boolean = true;
  response: any;
  data: any;
  image: any;
  page: number=1;
  count: number = 0;
  tablesize: number = 10; 
  paginate:any; 
  originalCandidateDetails: any;
  constructor(private commonService: CommanService, private cdr: ChangeDetectorRef) { }
  public college: any
  public selectedInstitution: any
  public batchDetails: any
  public institutionId: any
  batchdisable: boolean = false; // for UI batch dropdown
  selectedBatchId: any
  ngOnInit(): void {
    this.getInstitution(); //getall from institutionMasters
    this.GetallCandidate(); //getall from CandidateDetails
  }


  onTableDataChange(event:any) {
    this.page = event;
   
     }  


  // get all Institution API call
  getInstitution() {
    this.commonService.institution().subscribe((res: any) => {
      this.college = res.data
    })
  }

  // get all candidate detail API call
  GetallCandidate() {
    this.commonService.getAllCandidate().subscribe((res: any) => {
      this.CandidateDetails = res.data;
      this.originalCandidateDetails = res.data; // Store the original data
    });
  }


  // get batchdetail by instituteId 
  getBatchDetail(event: any) {
    var selectedinstitutionId = event.target.value;
    this.commonService.batchByInstiution(selectedinstitutionId).subscribe((data: any) => {
      this.batchList = data.data.batch
      this.batchdisable = true;
    });
  }

  //get batchname by BatchId
  getBatchId(event: any) {
    this.selectedBatchId = event.target.value;
    this.isDisabled = false;
  }


  // get Candidate By BatchId filter
  getCandidate(id: any) {
    this.commonService.getCandidateMarkByBatch(id).subscribe(
      (data: any) => {
        if (data && data.data && data.data.candidate) {
          this.CandidateDetails = data.data.candidate; 
        } else {
          this.CandidateDetails = []; 
        }
      }  );
  }
  
  resetFilter() {
    this.CandidateDetails = this.originalCandidateDetails;
    this.selectedBatchId = null; // Reset the selected batch ID
    this.isDisabled = true; // Optionally, disable the "Click" button
  }
  
  //Export for download the candidateDetails from ExcelSheet
  download() {
    this.exportAsExcelFile(this.CandidateDetails, 'Candidate_Details');
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
