import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { CommanService } from '../../../../Shared/service/comman.service';
import { Iquiz } from '../quiz-creation .interface';
import { showSuccessMessage, showWarningMessage } from '../../../../Shared/utilities/swal_utilities';
import { AlertIcon, AlertMessage, AlertTitle } from 'src/app/Components/login-design/swt-alert.enum';

@Component({
  selector: 'app-quiz-creation',
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.scss']
})
export class QuizCreationComponent implements OnInit {
  public show = true;
  public hide = false;
  public quiz:Iquiz={
    quizId:0,
    quizName: '',
    description: '',
    quizTemplateId: 0,
  };

  public gettemplate:any;
  public selectedTemplate: any;
  public templateid: any;
  public savedquiz: any;
  id: any;
  isupdate=false;
  isCreate=true;
  constructor(public service:CommanService, private router: Router,private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
      })
    this.templateList();
    this.edit();
  }

  onOptionsSelected(value: string) {
    if (value === "") {
      this.show = true;
      this.hide = false;
    }
    else {
      this.show = false;
      this.hide = true;
    }
  }
  
  //create new template
  create(){
  this.service.saveQuiz(this.quiz).subscribe((savequiz:any)=>{
    this.savedquiz=savequiz;
    if (this.savedquiz.statusCode == 200) {
      showSuccessMessage(savequiz.message).then(() => {
        this.router.navigate(['/dashboard/quizCreate', { quizTemplateId: this.quiz.quizTemplateId }]);
    })}
    else{
      showWarningMessage(savequiz.message);
    }
  })
  }

  //getall quiztemplates in dropdown
  templateList(){
    this.service.getQuiztempalte().subscribe((template:any)=>{
      if(template.statusCode == "200"){
        this.gettemplate=template.data;
      }
    })
  }
  edit(){
    this.service.editQuizz(this.id).subscribe((res:any)=>{
      this.quiz.quizId=res.data.quizId;
      this.quiz.quizName=res.data.quizName;
      this.quiz.description=res.data.description;
      this.quiz.quizTemplateId=res.data.quizTemplateId;
      this.quiz.quizName=res.data.quizName;
      this.isupdate=true
      this.isCreate=false
    })
  }
  update(){
      this.service.updateQuiz(this.quiz).subscribe((res:any)=>{
        this.service.callAlert(AlertTitle.UpdateTitle, AlertMessage.UpdateMessage, AlertIcon.UpdateIcon)
        this.quiz.quizName="";
        this.quiz.description="";
        this.quiz.quizTemplateId=-1;
        this.router.navigate(['/dashboard/quizList'])
      })
  }
}
