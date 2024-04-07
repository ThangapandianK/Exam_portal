import { Component, OnInit } from '@angular/core';


import { CommanService } from '../../../Shared/service/comman.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  quizList: any;
  quizId: any;
  constructor(private commonService:CommanService) { }

  ngOnInit(): void {
    this.getQuiz();
  }
 //getAllQuizzes 
public getQuiz(){
this.commonService.quiz().subscribe((res:any) => {
this.quizList = res.data
})
}
delete(id:any){
  this.commonService.deleteQuiz(id).subscribe((res:any)=>{
    this.getQuiz()
  })
    
}
}