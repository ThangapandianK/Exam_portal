import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Swal, { SweetAlertIcon } from 'sweetalert2';

import { environment } from '../../../../src/environments/environment';

export interface NewCategory {
  categoryName: string;
}
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizId:number = NaN;
  questionMode: string = 'edit';
  questionDetail: any = {
    "questionId": 0,
    "question": "Question 1",
    "description": "string",
    "answerTypeId": 0,
    "answerTypeName": "string",
    "mark": 3,
    "categoryId": 2,
    "categoryName": "string",
    "answersList": [
      {
        "answerId": 0,
        "answers": "Delhi",
        "isCorrect": 1
      },
      {
        "answerId": 1,
        "answers": "Chennai",
        "isCorrect": 0
      }
    ]
  }
  public url = environment.API_URL;
  constructor(public http: HttpClient) { }

  // Get Question categories
  public getCategoryMaster() {
    return this.http.get(this.url + 'api/CategoryMasters/GetCategoryMaster');
  }

 
//Get Question by Category Id
  public getCategoryMasterById(id:any){
    return this.http.get(this.url+`api/CategoryMasters/GetCategoryMasterById?CategoryId=${id}`)
   }

  public saveCategoryMaster(data: NewCategory) {
    return this.http.post(this.url + 'api/CategoryMasters/SaveCategoryMaster', data);
  }

 //update category details
 public updateCategoryName(data: any) {
  return this.http.put(this.url + "api/CategoryMasters/UpdateCategoryMaster", data);
}

  public SaveQuestionsDetails(data: any) {
    return this.http.post(this.url + 'api/QuestionsDetail/SaveQuestionsDetails', data);
  }

  public deleteCategory(id:any){
    return this.http.put(this.url + `api/CategoryMasters/DeleteCategoryMaster?CategoryId=${id}`,null);
   }

  public callAlert(alertTitle: string,alertMessage:string,alertIcon?:SweetAlertIcon):void{
    Swal.fire(
       alertTitle,
       alertMessage,
       alertIcon
     ).then((result) =>{
       
     })
    }

}
