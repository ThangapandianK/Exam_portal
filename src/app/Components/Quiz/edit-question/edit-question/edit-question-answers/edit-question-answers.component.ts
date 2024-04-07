import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { QuizService } from '../../../quiz.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommanService } from 'src/app/Shared/service/comman.service';

@Component({
  selector: 'edit-question-answers',
  templateUrl: './edit-question-answers.component.html',
  styleUrls: ['./edit-question-answers.component.scss']
})
export class EditQuestionAnswersComponent implements OnInit {
  id: any;

  constructor(public quizService: QuizService,private activateRoute: ActivatedRoute,public common:CommanService) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
      })
      this.edit(this.id);
  }

  ngOnChanges() {}

  @Input() singleChoice: boolean = true;
  @Input() setAnswerPoints: boolean = false;
  @Output() getAnswers = new EventEmitter<any>();
  isCorrectChoice:number = NaN;
  @Input() answerChoices: any = [{
    isCorrect: 0,
   // allowHTML: false,
    answers: "",
    answersId:"1",
   // points: 1
  }]
  defaultOptn = {
    isCorrect: 0,
   // allowHTML: true,
   answers: "",
   answersId:"1",
  //  points: 1
  }

  resetAnswers() {
    this.isCorrectChoice = NaN;
    this.answerChoices = [{
      isCorrect: 0,
      answers: "",
      answersId:"1",
     
    }];
    
  }
  
  answerChanged() {
    this.getAnswers.emit(this.answerChoices)
  }

  addAnswer() {
    let defOptn = Object.assign({}, this.defaultOptn);
    const nextId = this.getNextAnswerId();
    defOptn.answersId = nextId.toString();
    this.answerChoices.push(defOptn);
    this.answerChanged();
  }
  
  private getNextAnswerId(): number {
    
    let maxId = 0;
    let firstAnswerIdExists = false; 
  
    for (const choice of this.answerChoices) {
      const answersId = parseInt(choice.answersId);
      if (!isNaN(answersId) && answersId > maxId) {
        maxId = answersId;
      }
  
      if (answersId === 1) {
        firstAnswerIdExists = true;
      }
    }
  
    
    return firstAnswerIdExists ? maxId + 1 : 1;
  }
  
  
  
  singleChoiceAnswer(i: number) {
   let getIndex:number =  this.answerChoices.findIndex((x:any)=>
      x.isCorrect == 1 );
    console.log(getIndex);
    if(getIndex > -1){
      this.answerChoices[getIndex].isCorrect = 0;
    }
    this.answerChoices[i].isCorrect = 1;
    this.answerChanged();
  }

  deleteAnswer(i: number) {
    this.answerChoices.splice(i, 1);
    this.answerChanged();
  }

  public edit(id:any){
    this.common.editQuiz(id).subscribe((res:any)=>{
       this.answerChoices=res.data.answerList;
    })
  }
  }
