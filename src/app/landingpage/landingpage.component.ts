import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommanService } from '../Shared/service/comman.service';
import { EncryptionService } from '../Shared/service/encryption.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  @ViewChild('fullscreenCheckbox', { static: true }) fullscreenCheckbox!: ElementRef;

  frontPageHtml:any;
  showStartButton = false;
  isLightMode = true;
  isFullScreen = false;
  batchId:any;
  quizId:any;
  data:any;
  quizTemplateId:any;
  candidateId:any;
  constructor(public router: Router,private landingService: CommanService,private encryptionService: EncryptionService) { }

  ngOnInit(): void {
    // Retrieve the encrypted data from local storage
    const encryptedDataString = localStorage.getItem('encryptedData');

    if (encryptedDataString !== null) {
      // Parse the JSON string to get the encrypted data object
      const encryptedData = JSON.parse(encryptedDataString);

      // Decrypt the data using the EncryptionService
      this.quizId = this.encryptionService.decrypt(encryptedData.quizId);
      this.batchId = this.encryptionService.decrypt(encryptedData.batchId);
      this.quizTemplateId = this.encryptionService.decrypt(encryptedData.quizTemplateId);
      this.candidateId = this.encryptionService.decrypt(encryptedData.candidateId);

      
    } else {
     
    }

    this.getTempleteId(this.quizId);
  }

getTempleteId(id:any){
  this.landingService.quizId(id).subscribe((response)=>{
    this.data=response;
    this.data=this.data.data
    

    this.quizTemplateId = this.data.quizTemplateId
    this.quizTemplete(  this.quizTemplateId)
  })

}

  quizTemplete(id:any){
    this.landingService.quizTempleteGetID(id).subscribe(data => {
      // Assuming the API response is an array and you want the first item
      this.frontPageHtml = data;
      this.frontPageHtml=this.frontPageHtml.data.frontPageHtml
      this.batchId = localStorage.getItem('batchId');
      this.quizId = localStorage.getItem('quizId');
      this.quizTemplateId = localStorage.getItem('quizTemplateId');
      this.candidateId = localStorage.getItem('candidateId');
      
    });
  }
  toggleFullScreen() {

    const elem = document.documentElement as any; // Use 'any' to suppress type errors

    if (!document.fullscreenElement) {

      if (elem.requestFullscreen) {

        elem.requestFullscreen();

      } else if ((elem as any).mozRequestFullScreen) { // Type assertion here

        (elem as any).mozRequestFullScreen();

      } else if ((elem as any).webkitRequestFullscreen) { // Type assertion here

        (elem as any).webkitRequestFullscreen();

      } else if ((elem as any).msRequestFullscreen) { // Type assertion here

        (elem as any).msRequestFullscreen();

      }

    } else {

      
    }

   

  }

  startexam(){
    this.router.navigate(['questionview']);

  
  }

 

}
