import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { QuizService } from '../quiz.service';
import { IquestionByCategory } from './questionbycategory.interface';

@Component({
  selector: 'app-questionbycategory',
  templateUrl: './questionbycategory.component.html',
  styleUrls: ['./questionbycategory.component.scss']
})


  export class QuestionByCategoryComponent implements OnInit {
    public showquestions: IquestionByCategory = {};  
    categorylist: any;
    page: number=1;
    count: number = 0;
    tablesize: number = 10;
    paginate:any;
    id:any;
    constructor(private route: ActivatedRoute, private quizService: QuizService) { }
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.id = params.get('id')  
      
        })
            this.getCategoryById(this.id);
      
    }

  
//get questions by categoryId
    getCategoryById(categoryId: any) {
      this.quizService.getCategoryMasterById(categoryId).subscribe((res: any) => {        
      this.categorylist = res 
        })
  
  }
   
  //pagination 
onTableDataChange(event:any) {
  this.page = event;
  }


}
