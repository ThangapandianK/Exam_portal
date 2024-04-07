import { Component, OnInit,  ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { QuizService, NewCategory } from "../../quiz.service";
import { EditQuestionAnswersComponent } from './edit-question-answers/edit-question-answers.component';
import { CommanService } from 'src/app/Shared/service/comman.service';
import { AlertIcon, AlertMessage, AlertTitle } from 'src/app/Components/login-design/swt-alert.enum';
@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {
  title: string = ""
  quesObj: any = {
    title: "",
    category: "",
    newcategory: "",
    categoryList: [],
    mark: 1,
    answerTypeId: 1,
    answerList: []
  }
  AllCategory: any;
  categoryName?:any;
  categoryId?:any;
  @ViewChild(EditQuestionAnswersComponent) childComponent!: EditQuestionAnswersComponent;
  editQuiz: any;
  id: any;
  isSave=true;
  isUpdate=false;
  constructor(private activateRoute: ActivatedRoute, private quizService: QuizService,private common:CommanService,private router: Router) {
    this.activateRoute.url.subscribe(data => {
      const dataItem = data.find(item => item.path === 'question');
      if (dataItem) {
        this.quizService.questionMode = 'create';
        this.quizService.questionDetail = {};
      }
      if (this.quizService.questionMode === 'edit') {
        this.setQuestionDetails();
      }
    })
  }
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  }

  mentionConfig = {
    mentions: [
      {
        triggerChar: '@',
        items: [
          {
            id: '1',
            name: 'TJ Peden',
          },
        ],
        labelKey: 'name',
        mentionSelect(user: any) {
          return `<a href="#" id="${user.id}>${user.name}</a>`
        }
      }
    ]
  }
  ngOnInit(): void {
    this.getAllCategory();
    // this.edit(id)
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
      })
     this.edit();
  }
  // public selectedAnserType: number = 1;
  public singleChoice: boolean = true;
  public showPointCalc: boolean = false;
  public setAnswerPoints: boolean = false;

 

  getAnswers(evnt: Event) {
    console.log(evnt)
    this.quesObj.answerList = evnt;
  }

  answerType = [{
    answerTypeId: 1,
    displayText: "Single Choice"
  }, {
    answerTypeId: 2,
    displayText: "Multiple Choice"
  }

  ]
  setQuestionDetails() {
    this.quesObj.question = this.quizService.questionDetail.question;
    this.quesObj.mark = this.quizService.questionDetail.mark;
    this.quesObj.categoryId = this.quizService.questionDetail.categoryId;
    this.quesObj.description = this.quizService.questionDetail.description;
  }
  //getAll Category

  public getAllCategory() {

    this.quizService.getCategoryMaster().subscribe((res: any) => {
      this.AllCategory = res.data;

    });
      
         
  }
  selectCategory() {
  }

  createNewCategory() {
    let payload: NewCategory = {
      "categoryName": this.quesObj.newcategory
    }
    this.quizService.saveCategoryMaster(payload);
  }

  answerChoices: any = [{
    correct: false,
    allowHTML: false,
    answer: "",
    points: 1
  }]



  SaveQuestionAndAnswer() {
    
    if (!this.quesObj.description || this.quesObj.answerList.length === 0) {
        alert("Please fill in the Question Field and Provide Answers before saving.");
      return;
    }

    let payLoadArr = ["question", "description", "answerTypeId", "categoryId", "answerList", "mark"];
    let payLoad: any = {
      "quizId": this.quizService.quizId,
      "answerList": []
    };
  
    payLoadArr.forEach((key: string) => {
      payLoad[key] = this.quesObj[key];
    });
  
    this.quizService.SaveQuestionsDetails(payLoad).subscribe((data) => {
      this.common.callAlert(AlertTitle.SaveMessage, AlertMessage.SaveMessage, AlertIcon.SuccessIcon)
      // Clear input fields and reset values
      this.quesObj.question = "";
      this.quesObj.mark = 1;
      this.quesObj.categoryId = -1; 
      this.quesObj.newcategory = "";
      this.quesObj.description = "";
      this.quesObj.answerTypeId = 1;
       this.quesObj.answerList = []; 
      this.showPointCalc = false;
      this.childComponent.resetAnswers();
    });
  }
  public edit(){
   
    
    this.common.editQuiz(this.id).subscribe((res:any)=>{
      this.quesObj.questionId=res.data.questionId;
      this.quesObj.question=res.data.question;
      this.quesObj.mark=res.data.mark;
      this.quesObj.categoryId=res.data.categoryId;
      this.quesObj.description=res.data.description;
      this.quesObj.answerTypeId=res.data.answerTypeId;
      this.isUpdate=true;
      this.isSave=false;
    })
  }
  public update(){
    this.common.updateQuestion(this.quesObj).subscribe((res:any)=>{
      this.common.callAlert(AlertTitle.UpdateTitle, AlertMessage.UpdateMessage, AlertIcon.UpdateIcon)
      this.update=res;
      this.quesObj.question = "";
      this.quesObj.mark = 1;
      this.quesObj.categoryId = -1; 
      this.quesObj.newcategory = "";
      this.quesObj.description = "";
      this.quesObj.answerTypeId = 1;
       this.quesObj.answerList = []; 
      this.showPointCalc = false;
      this.childComponent.resetAnswers();
    })
  }
}
