import { Component, OnInit } from '@angular/core';

import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { CommanService } from '../../../../../src/app/Shared/service/comman.service';
import { showErrorMessage,showSuccessMessage, showWarningMessage} from '../../../Shared/utilities/swal_utilities';



@Component({
  selector: 'app-assign-batch-quiz',
  templateUrl: './assign-batch-quiz.component.html',
  styleUrls: ['./assign-batch-quiz.component.scss']
})
export class AssignBatchQuizComponent implements OnInit {
  dropdownSettings: IDropdownSettings = {};
  public batchlist: any[] = [];
  public quizlist: any[] = []; 
  quizList: any[] = []; 
  batchList: any[] = []; 
  college: any;
  isDisabled: boolean = true;//for batchlist

  constructor(private commonService:CommanService) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      idField: 'batchId', 
      textField: 'batchName', 
      enableCheckAll: false,
    };
    this.getAllQuizList() 
    this.getAllBatchList()
    this.getInstitution(); //getall from institutionMasters
  }

  public getAllQuizList() {
    this.commonService.quiz().subscribe((res:any) => {
      this.quizList = res.data
        })
      }

  public getAllBatchList() {
    this.commonService.batch().subscribe((res:any) => {
      this.batchList = res.data
           
        })
      }

      public assignQuiz() {
        if (!this.quizlist || this.quizlist.length === 0 || !this.batchlist || this.batchlist.length === 0) {
          showWarningMessage("Please select both Quiz and Batch.");
          return;
        }
        let selectedBatchIds: string[] = [];
        if (this.batchlist && this.batchlist.length > 0) {
            selectedBatchIds = this.batchlist.map((batch) => batch.batchId);
        }
      
             
        let payloads = selectedBatchIds.map((batchId) => ({
          batchId: batchId.toString(),
          quizId: this.quizlist.toString(), 
        }));
      
       
        payloads.forEach((payload) => {
          this.commonService.assignBatchQuiz(payload).subscribe(
            (data: any) => {
                           
               if (data.statusCode === 200) {
                showSuccessMessage(data.message);
              } else if (data.statusCode === 201) {
                showWarningMessage(data.message);
              }
            },
            (er) => {
              showErrorMessage(er.error.title);
            }
          );
        });   
        this.batchlist = [];
        this.quizlist = [];
      }
      

      // get all Institution API call
  getInstitution() {
    this.commonService.institution().subscribe((res: any) => {
      this.college = res.data
    })
  }
      
  // get batchdetail by instituteId 
  getBatchDetail(event: any) {
    var selectedinstitutionId = event.target.value;
    this.commonService.batchByInstiution(selectedinstitutionId).subscribe((data: any) => {
      this.batchList = data.data.batch
      this.isDisabled = false;
    });
  }
      
    }