import { Component, OnInit } from '@angular/core';

import { CommanService } from '../Shared/service/comman.service';
import { showSuccessMessage } from '../Shared/utilities/swal_utilities';
import { EncryptionService } from '../Shared/service/encryption.service';
import { AuthService } from '../Shared/guard/auth.service';

@Component({
  selector: 'app-lastlandingpage',
  templateUrl: './lastlandingpage.component.html',
  styleUrls: ['./lastlandingpage.component.scss']
})
export class LastlandingpageComponent implements OnInit {
  resultPageHtml: string = '';
  userAnswer:any;
  response:any;
  constructor(private commonService: CommanService,private authService:AuthService,private encryptionService: EncryptionService) { }


  ngOnInit(): void {
    this.commonService.getPageHtml().subscribe(data => {
      this.resultPageHtml = data?.data[0]?.resultPageHtml;
    });
  
    this.userAnswer = localStorage.getItem('myData');
     if (this.userAnswer) {
      const decryptedData = this.encryptionService.decrypt(this.userAnswer);
  
      // Now you can use the decrypted data as needed
      this.answerSubmit(decryptedData);
     
      
    }
   

    this.candidateLogout();
 
  }
candidateLogout(){
    setTimeout(() => {
      this.authService.logout();
    }, 5000);
  }
  
 answerSubmit(answers:any){

    this.commonService.saveUserAnswer(answers).subscribe(data=>{
      this.response=data
           
      if(this.response.statusCode==200){
        showSuccessMessage(this.response.message);
      }else{
      }
    })
  }

}
