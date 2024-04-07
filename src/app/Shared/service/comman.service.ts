import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../src/environments/environment';

import Swal,{ SweetAlertIcon} from 'sweetalert2';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommanService {
  
  addUser() {
    throw new Error('Method not implemented.');
  }
  public url = environment.API_URL;
  constructor(public http:HttpClient) { }
  uiDesign(){
    return this.http.get('assets/json/Ui.json')
  }
  uiDesignData(){
    return this.http.get('assets/json/DataUI.json')
  }

  //login
  public login(data:any,token:any) {
          return this.http.post(this.url+'api/Login/Login',data,token);
    }
  // Swal fire alert message
    public callAlert(alertTitle: string,alertMessage:string,alertIcon?:SweetAlertIcon):void{
     Swal.fire(
        alertTitle,
        alertMessage,
        alertIcon
      ).then((result) =>{
        
      })
     }

    //get quiz list
     public quiz(){
      return this.http.get(this.url+'api/Quiz/GetQuiz');
     }
     public saveQuiz(data:any){
      return this.http.post(this.url+'api/Quiz/SaveQuiz',data);
     }

    //get quiz by Id
      public quizId(id:any){
      return this.http.get(this.url + `api/Quiz/GetQuizById?QuizId=${id}`) 
      }

    //save quiztemplate
    public saveQuiztempalte(data:any){
      return this.http.post(this.url+'api/QuizTemplate/SaveQuizTemplate',data);
     }
    //getall quiztemplates 
     public getQuiztempalte(){
      return this.http.get(this.url+'api/QuizTemplate/GetQuizTemplates');
     }
    //getbyid quiztemplates
    public getQuiztempaltebyid(id:any){
      return this.http.get(this.url + `api/QuizTemplate/GetQuizTemplatesById?QuizTemplateId=${id}`)
     }
    //update quiztemplate
    public updateQuiztemplate(data: any) {
      return this.http.put(this.url + 'api/QuizTemplate/UpdateQuizTemplate', data);
    }

    //get all institution
    public institution(){
      return this.http.get(this.url+'api/InstitutionMaster/GetInstitutionMaster');
    }

    //getInstitutionMasterById
    public institutionById(id:any){
      return this.http.get(this.url + `api/InstitutionMaster/GetInstitutionMasterById?InstitutionId=${id}`)
    }
    
    //get all batch
    public batch(){
      return this.http.get(this.url+'api/BatchDetail/GetBatchDetail')
    }
   //getBatch by institution Id
    public batchByInstiution(id:any){
      return this.http.get(this.url + `api/BatchDetail/GetBatchDetailByInstitutionId?InstitutionId=${id}`)
    }
    //update batch details
    public updateBatch(data: any) {
      return this.http.put(this.url + "api/BatchDetail/UpdateBatchDetail", data);
    }
    //update institution details
    public updateInstn(data: any) {
      return this.http.put(this.url + 'api/InstitutionMaster/UpdateInstitutionMaster', data);
    }
    //add new institution
    public addInstitution(data:any){
      return this.http.post(this.url+'api/InstitutionMaster/SaveInstitutionMaster',data);
     }
     //delete institution by Id
     public deleteInstitutionById(id:any) {
      return this.http.put(this.url + `api/InstitutionMaster/DeleteInstitutionMaster?InstitutionId=${id}`,null);
    }
    public deleteBatchById(id:any){
      return this.http.put(this.url + `api/BatchDetail/DeleteBatchDetail?BatchId=${id}`,null);
    }
    //add new batch
    public newBatch(data:any){
      return this.http.post(this.url+'api/BatchDetail/SaveBatchDetail',data);
     }

     public assignBatchQuiz(data:any){
      return this.http.post(this.url+'api/BatchQuiz/CreatebatchQuiz',data);
     }

     
     //get user by batch
     public userByBatch(id:any){
      return this.http.get(this.url + `api/CandidateDetail/GetCandidateDetailByBatchId?BatchId=${id}`)
     }
//get user by userId
     public getUserByUserId(id:any){
      return this.http.get(this.url+`api/CandidateDetail/GetCandidateDetailById?CandidateId=${id}`)
     }

     //Update User Details
     public updateUserDetails(data:any){
      return this.http.put(this.url+'api/CandidateDetail/UpdateCandidateDetail',data);
     }
     //add new user
     public addUsers(data:any){
      return this.http.post(this.url + 'api/CandidateDetail/SaveCandidateDetail',data);
     }
     //add BulkUser
     public addBulkUsers(data: FormData, id: any, isExcelFile: boolean, isCsvFile: boolean){
      return this.http.post(this.url +`api/CandidateDetail/SaveBulkCandidate?BatchId=${id}&isExcelFile=${isExcelFile}&isCsvFile=${isCsvFile}`,data);
     }

     //delete user by Id
     public deleteUserById(id:any){
      return this.http.put(this.url + `api/CandidateDetail/DeleteCandidateDetail?CandidateId=${id}`,null);
     }
     public quizGetAll(id:any){
      return this.http.get(this.url+`api/Quiz/GetQuizById?QuizId=${id}`)
     }
     public quizGetByID(id:any){
      return this.http.get(this.url+`api/QuestionsDetail/GetQuestionsDetailsById?QuestionId=${id}`)
     }
     quizTempleteGetID(id:any){
      return this.http.get(this.url+`api/QuizTemplate/GetQuizTemplatesById?QuizTemplateId=${id}`)
     }

   
     getPageHtml(): Observable<any> {
      return this.http.get<any>(this.url +'api/QuizTemplate/GetQuizTemplates');
    }
    //display candidate count
    public getCandidateCount() {
      return this.http.get(this.url +'api/CandidateDetail/GetCandidateCount');
    }
    //display quiz list count
    public getQuizCount() {
      return this.http.get(this.url +'api/Quiz/GetQuizCount');
  }
  public getAllCandidate(){
    return this.http.get(this.url+'api/CandidateDetail/GetCandidateDetail');
  }
  
  public getCandidateByBatch(id:any){
    return this.http.get(this.url+`api/CandidateDetail/GetCandidateDetailByBatchId?BatchId=${id}`)
   }

   public getCandidateMarkByBatch(id:any){
    return this.http.get(this.url+`api/CandidateDetail/GetCandidateTotalMarkByBatchId?BatchId=${id}`)
   }


public saveUserAnswer(data:any){
  return this.http.post(this.url+'api/UserAnswer/SaveUserAnswers',data)
}
 
public saveImage(data:any){
  return this.http.post(this.url+'api/ScreenShot/SaveScreenShot',data)
}

public getscreenShot(id:any){
  return this.http.get(this.url+`api/ScreenShot/GetScreenShot?CandidateId=${id}`)
 }

 public getAllLogger(){
  return this.http.get(this.url+'api/ExceptionLogger/GetAllExceptionLogger');
}

public getStartDateEndDateLogger(fromDate:any,toDate:any){
  return this.http.get(this.url + `api/ExceptionLogger/GetExceptionLoggerStartAndEndDate?fromDate=${fromDate}&toDate=${toDate}`);
}
 public getKeyBoard(id:any){
  return this.http.get(this.url+`api/UserAnswer/GetUserResultById?UserId=${id}`)
 }
  
public editQuiz(id:any){
  return this.http.get(this.url+`api/QuestionsDetail/GetQuestionsDetailsById?QuestionId=${id}`)
}

public updateQuestion(data:any){
  return this.http.put(this.url+'api/QuestionsDetail/UpdateQuestionsDetails',data);
}
public deleteQuestion(questionId: any) {
  return this.http.put(`${this.url}api/QuestionsDetail/DeleteQuestion?questionId=${questionId}`, null);
}
public deleteQuiz(id:any){
  return this.http.put(this.url + `api/Quiz/DeleteQuiz?QuizId=${id}`,null);
}
editQuizz(id:any){
  return this.http.get(this.url+`api/Quiz/GetQuizById?QuizId=${id}`)
}
updateQuiz(data:any){
  return this.http.put(this.url+'api/Quiz/UpdateQuizDetails',data)
}

editBatch(id:any){
  return this.http.get(this.url+`api/BatchDetail/GetBatchDetailById?BatchId=${id}`)
}
}
