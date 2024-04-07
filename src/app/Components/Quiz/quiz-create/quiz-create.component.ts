import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CommanService } from '../../../Shared/service/comman.service';
import { IQuizCreate } from './quiz-create.interface';
import { showSuccessMessage, showWarningMessage } from '../../../Shared/utilities/swal_utilities';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.scss']
})
export class QuizCreateComponent implements OnInit {
  
  public quiztemplate:IQuizCreate={
    templateName: '',
    timeLimit: 0,
    templatedata: {
      quizExecution: false,
      quizOverview: false,
      regUsersOnly: false
    },
    frontPageHtml: '',
    resultPageHtml: ''
  };

  // Declare an object to store the retrieved data
  public getTemplatebyid: any = {};
  public quizTemplateId: any;
  public updatedTemplate: any;
  public savedTemplate: any;
    
  constructor(public service:CommanService,private route: ActivatedRoute,private http: HttpClient,private router: Router) {

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
        mentionSelect(user:any) {
          return `<a href="#" id="${user.id}>${user.name}</a>`
        }
      }
    ]
  }

  ngOnInit():void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.quizTemplateId = params.get('quizTemplateId')  
      })
          this.gettemplateById(this.quizTemplateId);
  }


  //get templates by quizTemplateId
  gettemplateById(quizTemplateId: any) {
    this.service.getQuiztempaltebyid(quizTemplateId).subscribe((templatestored: any) => {        
    this.quiztemplate.templateName = templatestored.data.templateName 
    this.quiztemplate.timeLimit = templatestored.data.timeLimit

    this.quiztemplate.templatedata.quizExecution = templatestored.data?.templateData.quizExecution
    this.quiztemplate.templatedata.quizOverview = templatestored.data?.templateData.quizOverview
    this.quiztemplate.templatedata.regUsersOnly = templatestored.data?.templateData.regUsersOnly
    this.quiztemplate.frontPageHtml = templatestored.data.frontPageHtml
    this.quiztemplate.resultPageHtml = templatestored.data.resultPageHtml
    })
}

  //create new template
  createtemp(){
    const quizTemplate = {
        quizExecution: this.quiztemplate.templatedata.quizExecution? 1 : 0,
        quizOverview: this.quiztemplate.templatedata.quizOverview? 1 : 0,
        regUsersOnly: this.quiztemplate.templatedata.regUsersOnly? 1 : 0
    };

    const payload ={
      templateName: this.quiztemplate.templateName,
      timeLimit: this.quiztemplate.timeLimit,
      templateData: quizTemplate,
      frontPageHtml: this.quiztemplate.frontPageHtml,
      resultPageHtml: this.quiztemplate.resultPageHtml
    }
    
    this.service.saveQuiztempalte(payload).subscribe((savetemplate:any)=>{
      this.savedTemplate=savetemplate;
      if (this.savedTemplate.statusCode == 200) {
        showSuccessMessage(savetemplate.message).then(() => {
          this.router.navigate(['/dashboard/quiz']);
      });
      }
      else{
        showWarningMessage(savetemplate.message);
      }
    })
    }

    updateTemp(){
      const quizTemplate = {
        quizExecution: this.quiztemplate.templatedata.quizExecution? 1 : 0,
        quizOverview: this.quiztemplate.templatedata.quizOverview? 1 : 0,
        regUsersOnly: this.quiztemplate.templatedata.regUsersOnly? 1 : 0
    };

    const payload ={
      templateName: this.quiztemplate.templateName,
      timeLimit: this.quiztemplate.timeLimit,
      quizTemplateId:this.quizTemplateId,
      templateData: quizTemplate,
      frontPageHtml: this.quiztemplate.frontPageHtml,
      resultPageHtml: this.quiztemplate.resultPageHtml
    }
    
      this.service.updateQuiztemplate(payload).subscribe((updatetemplate:any) => {
        
        this.updatedTemplate=updatetemplate
        if (this.updatedTemplate.statusCode == 200) {
          showSuccessMessage(updatetemplate.message).then(() => {
            this.router.navigate(['/dashboard/quizList']);
        });
        }
        else{
          showWarningMessage(updatetemplate.message);
        }
      });
    }

}