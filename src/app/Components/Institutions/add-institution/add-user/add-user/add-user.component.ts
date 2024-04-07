import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { CommanService } from '../../../../../../../src/app/Shared/service/comman.service';
import { AlertIcon, AlertMessage, AlertTitle } from '../../../../login-design/swt-alert.enum';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public closeResult: any;
  public candidateDetails:any;
  id:any;
  batches:any;
  addNewBatch: string="";
  users:any
  selectedInstitution: any;
  selectedId: any;
  batchDetails: any
  confirmBtnClr: string | undefined;
  cancelBtnClr: string | undefined;
  instn: any;
  batchIds: any;
  batch:any;
  batchEdit: any;
  constructor(private route: ActivatedRoute, private commonService: CommanService,private modalService: NgbModal){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id=params.get('id');
      this.batchByInstitutionId(this.id); 
       })   
  }
  //get batchlist by institution id
  public batchByInstitutionId(id:any){
    this.commonService.batchByInstiution(id).subscribe((res:any) => {
      this.batches=res.data.batch
      this.instn = res.data;
      
      if(this.batches.length > 0) {
        this.usersByBatchId(this.batches[0].batchId);
        
      }
      
    }) 
  }
  onOptionsSelected(id:any){
     
this.usersByBatchId(id)

  }

 //add new batch under institution
addBatch(){
    if (this.addNewBatch.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Batch Name cannot be empty!',
      });
      return; 
    }
      let payload = {
      "BatchName": this.addNewBatch,
      "InstitutionId":this.id
    }
    this.commonService.newBatch(payload).subscribe((data: any) => {
      
      this.addNewBatch="";
     this.batchByInstitutionId(this.id); 
    })
   

}

//get users by batchId
public usersByBatchId(id:any){
  this.commonService.userByBatch(id).subscribe((res:any) => {
       this.users=res.data.candidate
     }) 
}
deleteUser(id:any){
  Swal.fire({
    title: AlertTitle.WarningTitle,
    icon: AlertIcon.DeleteWarningIcon,
    showCancelButton: true,
    confirmButtonColor: this.confirmBtnClr,
    cancelButtonColor: this.cancelBtnClr,
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.commonService.deleteUserById(id).subscribe(res => {
        if(res ==200) {
          this.commonService.callAlert(AlertTitle.Deletetitle, AlertMessage.DeleteMessage, AlertIcon.DeleteIcon)
        
        }
      })
     
    }
  })
}

  /**
   * close modal popup
   * @param reason 
   * @returns 
   */
  public open(content: any, batch: any)  {
    this.editBatch(batch);
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


 // get batch by institution id
 edit(content: any,id:any) {
  this.commonService.getUserByUserId(id).subscribe((res:any)=>
  {
    this.candidateDetails=res;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  })
}


public updatecandidateDetails(id:any){
  let userForm={
    'candidateId':id,
    'firstName': this.candidateDetails.firstName,
    'lastName':this.candidateDetails.lastName,
    'emailId':this.candidateDetails.emailId,
    'phoneNo':this.candidateDetails.phoneNo,
    'password':this.candidateDetails.password,
    'website':this.candidateDetails.website,
    'batchId':this.candidateDetails.batchId
  }
  this.commonService.updateUserDetails(userForm).subscribe(data=>
    {
   
    })
}

editBatch(batch:any){
  this.commonService.editBatch(batch.batchId).subscribe((res:any)=>{
    this.batchEdit=res;
    this.batches.batchName=res.batchName;
    
  })
  
}
updateBatch() {
  
  this.batchEdit.batchName = this.batches.batchName;
  this.commonService.updateBatch(this.batchEdit).subscribe((res: any) => {
    this.commonService.callAlert(AlertTitle.UpdateTitle, AlertMessage.UpdateMessage, AlertIcon.UpdateIcon)
    this.modalService.dismissAll();
    this.batchByInstitutionId(this.id);
  });
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
    this.commonService.deleteBatchById(id).subscribe((res:any)=>{
      if(res.statusCode === 200) {
        let alertSer =  this.commonService.callAlert(AlertTitle.Deletetitle, AlertMessage.DeleteMessage, AlertIcon.DeleteIcon);
        this.batchByInstitutionId(this.id);
       } 
    })
  }
});
}
}
