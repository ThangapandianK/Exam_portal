import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommanService } from 'src/app/Shared/service/comman.service';
import { QuizService } from '../../quiz.service';
import { AlertIcon, AlertMessage, AlertTitle } from 'src/app/Components/login-design/swt-alert.enum';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  checkboxModel:any
  
  questions: any;
  data: any;
  id: any;
  res: any;
  questionId: any;
  questionIds: any;
  
  constructor( private router: Router,private commonService:CommanService,private route: ActivatedRoute, private quizService:QuizService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
    this.id = params.get('id')
    this.quizService.quizId = this.id;
    })
   //call function quizById

     this.quizById(this.id);    
  }
  //getQuizbyId
  public quizById(id:any){
      this.commonService.quizId(id).subscribe((res:any) => {
      this.questions=res.data.questions;
       this.questionIds=res.data.questionId;
   })
  }
// edit(){
//   localStorage.setItem('questionId',this.res.data.questionId );
//   console.log(this.res.questions.questionId)
// }

//To select all checkboxes
  checkAllCheckBox(ev: any) { 
		this.questions.forEach((x: { checked: any; }) => x.checked = ev.target.checked)
	}

	isAllCheckBoxChecked() {
		return this.questions?.every((question: { checked: any; }) => question.checked);
	}
  editQuestion() {
    this.router.navigate(['/editquestion']);
    // this.quizService.questionDetail = quest;
    // this.quizService.questionMode = 'edit';
  }
  delete(id: any) {
    this.commonService.deleteQuestion(id).subscribe(
      (res: any) => {
        this.commonService.callAlert(AlertTitle.Deletetitle, AlertMessage.DeleteMessage, AlertIcon.DeleteIcon)
        this.quizById(this.id);
      });
  }  
}
