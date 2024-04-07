import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';
import { AlertIcon, AlertMessage, AlertTitle } from '../../../../../../src/app/Components/login-design/swt-alert.enum';

import { CommanService } from '../../../../Shared/service/comman.service';
import { IaddInstitutions } from './add-institution.interface';
import { CANCEL_BUTTON_COLOR, CONFIRM_BUTTON_COLOR,} from '../../../../../../src/app/Shared/constant/constant';

@Component({
  selector: 'app-add-institution',
  templateUrl: './add-institution.component.html',
  styleUrls: ['./add-institution.component.scss']
})

export class AddInstitutionComponent implements OnInit {
  public addInstitutions: IaddInstitutions = {};
  public closeResult: any;
  public editMode: boolean = false;
  public clg: any;
  public assignFunction: any;
  public selectedInstitution: any;
  public institution: string = ""
  public cancelBtnClr= CANCEL_BUTTON_COLOR;
  public confirmBtnClr = CONFIRM_BUTTON_COLOR;
  batchName: string = "";
  batchDetails: any
  college: any;
  response: any;
  selectedId: any;
  batch: any;
  constructor(private modalService: NgbModal, private commonService: CommanService) {
   }

  ngOnInit(): void {
    this.getInstitution();
    this.getBatch();
  }
  public open(content: any, clg: any) {
    this.edit(clg)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  public getDismissReason(reason: any) {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  //Add new college
  public addClg() {
    if (this.institution.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'College Name cannot be empty!',
      });
      return; 
    }
       let payload = {
      "institutionName": this.institution
    }
    this.commonService.addInstitution(payload).subscribe((data: any) => {
      this.institution="";
      this.getInstitution();
    })
  }

 // get batch by institution id
 edit(clg: any) {
  this.selectedInstitution = clg;
  this.editMode = false;
  this.selectedId = null;
  this.commonService.institutionById(clg.institutionId).subscribe((response: any) => {
  this.selectedInstitution=response;
  this.batchDetails = response?.data.batch
   })

}
  // updatae batch by Id
public UpdateBatchDetails() {
      let payLoad = {
      "batchId": this.selectedId,
      "batchName": this.batchName,
      "institutionId": this.selectedInstitution.institutionId
    }
      this.commonService.updateBatch(payLoad).subscribe(() => {
      this.commonService.callAlert(AlertTitle.UpdateTitle, AlertMessage.UpdateMessage, AlertIcon.UpdateIcon)
      this.getBatch();
      this.modalService.dismissAll();
    });
  }

  edit1(batch: any) {
    if (this.editMode) {
     /*let batchIndex = this.batchDetails.findIndex((batch: any) => batch.batchId === this.selectedId)
     this.batchDetails[batchIndex].batchName = this.batchName;*/
      if (this.selectedId === batch.batchId) {
        this.editMode = false;
        this.UpdateBatchDetails();
      }
    }
    else {
      this.editMode = true;
    }
    this.selectedId = batch.batchId;
    this.batchName = batch.batchName;
  }

  //get all batches
  getBatch() {
    this.commonService.batch().subscribe((res: any) => {
    })
  }

  //get all institution
  getInstitution() {
    this.commonService.institution().subscribe((res: any) => {
      this.college = res.data
         })
  }

  //edit institution name
  updateInstitution(collegeId:any,collegeName:any){
    const payLoad = {
      "InstitutionId": collegeId,
      "InstitutionName": collegeName
    }
    this.commonService.updateInstn(payLoad).subscribe((res) => {
      this.commonService.callAlert(AlertTitle.UpdateTitle, AlertMessage.UpdateMessage, AlertIcon.UpdateIcon)
      this.getInstitution()
      this.modalService.dismissAll();
    });
  }

 public deleteInstution(id: any) {
       Swal.fire({
      title: AlertTitle.WarningTitle,
      icon: AlertIcon.DeleteWarningIcon,
      showCancelButton: true,
      confirmButtonColor: this.confirmBtnClr,
      cancelButtonColor: this.cancelBtnClr,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commonService.deleteInstitutionById(id).subscribe((res:any) => {
          if(res.statusCode === 200) {
           let alertSer =  this.commonService.callAlert(AlertTitle.Deletetitle, AlertMessage.DeleteMessage, AlertIcon.DeleteIcon);
           this.getInstitution();
          }
        })
      }
    })
  }

  deleteBatch(id:any){
    Swal.fire({
      title: AlertTitle.WarningTitle,
      icon: AlertIcon.DeleteWarningIcon,
      showCancelButton: true,
      confirmButtonColor: this.confirmBtnClr,
      cancelButtonColor: this.cancelBtnClr,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commonService.deleteBatchById(id).subscribe((res:any) => {
          if(res.statusCode === 200) {
           let alertSer =  this.commonService.callAlert(AlertTitle.Deletetitle, AlertMessage.DeleteMessage, AlertIcon.DeleteIcon);
           this.getBatch();
          }
        })
      }
    })
  }
}

 