import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { CommanService } from '../../../../../../../src/app/Shared/service/comman.service';
import { ICandidatelist } from './user-list.interface';
import { AddUserDetailsComponent } from '../../add-user-details/add-user-details/add-user-details.component';
import { showErrorMessage, showSuccessMessage, showWarningMessage } from '../../../../../Shared/utilities/utilities';
import { EncryptionService } from '../../../../../../../src/app/Shared/service/encryption.service';




@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  public CandidateList: ICandidatelist = {
    BatchNo: '',
    firstName: '',
    emailId: '',
    batchId: '',
    lastName: '',
    phoneNo: '',
    password: '',
    website: '',
    createdDate: '',
    updatedDate: '',
    file: []
  }
  batchId: any;
  addUser: any;
  CandidateDetail: any;
  id: any;
  file: any;
  arrayBuffer: any;
  filelists: any;
  tableShow: boolean = true;
  ErrorShow: boolean = false;
  reportData: any;
  public response: any;
  constructor(private route: ActivatedRoute, private commonService: CommanService, private modalService: NgbModal,private encryptionService: EncryptionService) {
  }

  AddUserModal() {
    const modalRef = this.modalService.open(AddUserDetailsComponent, { size: 'lg' });

    modalRef.componentInstance.userAdded.subscribe(() => {
        modalRef.close();
        this.userByBatch(this.id);
    });

    modalRef.result.then((result) => {
    }).catch((error) => {

    });
}



  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
        // Encrypt and store the batchid in local storage
        const encryptedBatchId = this.encryptionService.encrypt(this.id);
        localStorage.setItem('batchid', encryptedBatchId);
        this.userByBatch(this.id);
    }); 

  }

  public userByBatch(id: any) {
    this.commonService.userByBatch(id).subscribe((res: any) => {
      this.CandidateDetail = res.data
      this.CandidateDetail = this.CandidateDetail.candidate
    })
  }
 
  onFileSelect(event: any) {
    this.file = event.target.files[0];
    this.uploadFile();
  }
  onSubmit() {
    this.commonService.userByBatch(this.id).subscribe(rep => {
    })
}
chooseFile() {
  this.fileInput.nativeElement.click();
}

uploadFile() {
  const formData: FormData = new FormData();
  const fileName = this.file.name;
  const isExcelFile = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
  const isCsvFile = fileName.endsWith('.csv');

  formData.append('excelFile', this.file);
  formData.append('isExcelFile', isExcelFile.toString());
  formData.append('isCsvFile', isCsvFile.toString());

  // this.commonService.userByBatch(this.id).subscribe((rep) => {
  // });

  this.commonService.addBulkUsers(formData, this.id, isExcelFile, isCsvFile).subscribe(
    (data: any) => {
      this.response = data;
      if (this.response.statusCode == 202) {
        showWarningMessage(data.message);
      } 
      else if (this.response.statusCode == 200) {
        showSuccessMessage(data.message);
        this.userByBatch(this.id);
      }
      else if(this.response.statusCode == 201){
        showWarningMessage(data.message)
      }
    },
    (er) => {
      showErrorMessage(er.error.title);
    }
  );

  this.fileInput.nativeElement.value = '';
  this.file = null;
  this.CandidateList.file = [];
  
}


report() {
  this.ErrorShow = true;
  this.tableShow = false;
  this.getBatchById();
}
getBatchById() {
  this.commonService.userByBatch(this.id).subscribe(
    (data: any) => {
      this.reportData = data;
    },
    (error: any) => {
      showErrorMessage(error.title);
    }
  );
}

}
