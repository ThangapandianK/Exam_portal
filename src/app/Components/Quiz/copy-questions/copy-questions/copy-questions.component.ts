import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-copy-questions',
  templateUrl: './copy-questions.component.html',
  styleUrls: ['./copy-questions.component.scss']
})
export class CopyQuestionsComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  CollegeDropdownSettings = {};
//selectedItems:any;
selected:any;
  questions: any = [
  {questionId: "1",
    questionName: "question 1",
  },
  {questionId: "2",
  questionName: "question 2",
  },
  {questionId: "3",
  questionName: "question 3",
  },
  {questionId: "4",
  questionName: "question 4",
  },
]
colleges: any=[
  {collegeId: "1",
    collegeName: "SXCCE",
  },
  {collegeId: "2",
    collegeName: "ACEW",
  },
  {collegeId: "3",
    collegeName: "MET",
  },
  {collegeId: "4",
    collegeName: "NICE",
  },
]


  constructor() { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'questionId',
      textField: 'questionName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  
  }
  onOptionsSelected(value:string){
    // api call to get questions by passing the college ID
  }
  saveQuestions(){
    //write the api to save the selected questions  
  }
  

  
}
