import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

import { CANCEL_BUTTON_COLOR, CONFIRM_BUTTON_COLOR } from '../../../../../src/app/Shared/constant/constant';
import { AlertIcon, AlertMessage, AlertTitle } from '../../../../../src/app/Components/login-design/swt-alert.enum';
import { CommanService } from '../../../../../src/app/Shared/service/comman.service';
import { Icategory } from './category.interface';
import { QuizService } from '../quiz.service';
import { ValidationService } from '../../../../../src/app/Shared/service/validation.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})


  export class CategoryComponent implements OnInit {
    public addInstitutions: Icategory = {};
    public closeResult: any;
    public editMode: boolean = false;
    public ctg: any;
    public assignFunction: any;
    public selectedCategory: any;
    public category: string = ""
    public cancelBtnClr= CANCEL_BUTTON_COLOR;
    public confirmBtnClr = CONFIRM_BUTTON_COLOR;
    batchName: string = "";
    categoryName: any;
    batchDetails: any;
    categorylist: any;
    response: any;
    selectedId: any;
    batch: any;
    page: number=1;
    count: number = 0;
    tablesize: number = 10;
    paginate:any;
    editedCategory: Icategory = {};
    isValid: boolean = true;
    constructor(private modalService: NgbModal, private commonService: CommanService, private quizService: QuizService, private validate: ValidationService) { }
  
    ngOnInit(): void {
      this.getCategory();
      
    }
    public open(content: any, ctg: any) {
      this.edit(ctg)
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

  
    
    //Add new category
    public addcategory() {
      
      if (this.category.trim() === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Category cannot be empty!',
        });
        return; 
      }
         let payload = {
        "categoryName": this.category
      }
      this.quizService.saveCategoryMaster(payload).subscribe((data: any) => {
         this.category = ""; 
        this.getCategory();
      })
      
    
    }
   

edit(ctg: Icategory) {
  this.editedCategory = { ...ctg };
  this.editMode = true;
  this.selectedId = null;
}
 
 
    //get all category
    getCategory() {
      this.quizService.getCategoryMaster().subscribe((res: any) => {
        this.categorylist = res.data
        console.log(res.data);
        
           })
    }
    //edit category name
    updateCategory() {
       this.quizService.updateCategoryName(this.editedCategory).subscribe(() => {
        this.quizService.callAlert(AlertTitle.UpdateTitle, AlertMessage.UpdateMessage, AlertIcon.UpdateIcon);
        this.modalService.dismissAll();
  
        const index = this.categorylist.findIndex((ctg: { categoryId: any; }) => ctg.categoryId === this.editedCategory.categoryId);
        if (index !== -1) {
          this.categorylist[index] = { ...this.editedCategory };
        }
  
        this.editedCategory = {};
      });
    }
 
    public deleteCategoryName(id: any) {
      Swal.fire({
     title: AlertTitle.WarningTitle,
     icon: AlertIcon.DeleteWarningIcon,
     showCancelButton: true,
     confirmButtonColor: this.confirmBtnClr,
     cancelButtonColor: this.cancelBtnClr,
     confirmButtonText: 'Yes, delete it!'
   }).then((result) => {
     if (result.isConfirmed) {
       this.quizService.deleteCategory(id).subscribe((res:any) => {
         if(res.statusCode === 200) {
          let alertSer =  this.commonService.callAlert(AlertTitle.Deletetitle, AlertMessage.DeleteMessage, AlertIcon.DeleteIcon);
          this.getCategory();
         } 
       })
      
     }
   })
 }

onTableDataChange(event:any) {
  this.page = event;
  this.getCategory();
}



  }
   
