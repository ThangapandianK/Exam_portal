import { Component, EventEmitter, OnInit ,Output} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';


import { IaddUser } from './add-user-details.interface';
import { CommanService } from '../../../../../Shared/service/comman.service';

import { ValidationService } from '../../../../../../../src/app/Shared/service/validation.service';
import { showErrorMessage, showSuccessMessage, showWarningMessage } from '../../../../../Shared/utilities/swal_utilities';
import { EncryptionService } from '../../../../../../../src/app/Shared/service/encryption.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-add-user-details',
  templateUrl: './add-user-details.component.html',
  styleUrls: ['./add-user-details.component.scss']
})
export class AddUserDetailsComponent implements OnInit {
@Output() userAdded: EventEmitter<void> = new EventEmitter<void>();
  public batches: any[] = [];
  public addUser: IaddUser = {
    firstName: '',
    lastName: '',
    password: '',
    emailId: '',
    website: '',
    phoneNo: ''
  };
  id: any;
  email: string = '';
  isValid: boolean = false;
  isValidPhoneNumber: boolean = false;
  institution: any;
  getInstitution: any;
  selectedInstitution: any;
  batchDetails: any;
  clg: any;
  BatchName: any;
  batchId: any;
  phoneNumber: string = '';
  



  constructor(private modalService: NgbModal,private route: ActivatedRoute, private commonService: CommanService, private validationService: ValidationService,private encryptionService: EncryptionService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
    })
    this.batchByInstitutionId(this.id);
 // Decrypt the batchId from local storage
 const encryptedBatchId = localStorage.getItem('batchid');
 if (encryptedBatchId) {
   this.batchId = this.encryptionService.decrypt(encryptedBatchId);
 }
 
  }

  closeModal() {
    this.modalService.dismissAll();
  }


  get emailPattern(): string {
    return this.validationService.emailPattern;
  }

  get mobilePattern(): string {
    return this.validationService.mobilePattern;
  }


  // getBatchByInstitutionId
  public batchByInstitutionId(id: any) {
    this.commonService.batchByInstiution(id).subscribe((res: any) => {

      this.batches = res.data.batch
    })
  }

  public addBatch() {
    if (this.BatchName) {
      this.batches.push(this.BatchName);
      this.BatchName = ''; // Clear the input field
    }
  }
  public addNewUser() {
    let payload = {
        "firstName": this.addUser.firstName,
        "lastName": this.addUser.lastName,
        "emailId": this.addUser.emailId,
        "phoneNo": this.addUser.phoneNo,
        "password": this.addUser.password,
        "website": this.addUser.website,
        "batchId": this.batchId
    }

    this.commonService.addUsers(payload).subscribe((data: any) => {
      if (data.statusCode == 200) {
          showSuccessMessage(data.message);
          // Emit the event to notify the parent component
          this.userAdded.emit();
      } else if (data.statusCode == 201) {
          showWarningMessage(data.message);
      }
  }, er => {
      showErrorMessage(er.error.title);
  });
}


}

