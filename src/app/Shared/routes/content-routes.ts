import { Routes } from '@angular/router';

import { DashboardComponent } from '../../../../src/app/Components/commonUI/dashboard/dashboard.component';
import { SettingsComponent } from '../../../../src/app/Components/commonUI/settings/settings.component';
import { AddInstitutionComponent } from '../../../../src/app/Components/Institutions/add-institution/add-institution/add-institution.component';
import { AddUserDetailsComponent } from '../../../../src/app/Components/Institutions/add-institution/add-user-details/add-user-details/add-user-details.component';
import { AddUserComponent } from '../../../../src/app/Components/Institutions/add-institution/add-user/add-user/add-user.component';
import { CategoryComponent } from '../../../../src/app/Components/Quiz/category/category.component';
import { CopyQuestionsComponent } from '../../../../src/app/Components/Quiz/copy-questions/copy-questions/copy-questions.component';
import { EditQuestionComponent } from '../../../../src/app/Components/Quiz/edit-question/edit-question/edit-question.component';
import { LeaderBoardComponent } from '../../../../src/app/Components/Quiz/leader-board/leader-board/leader-board.component';
import { QuestionsCreateComponent } from '../../../../src/app/Components/Quiz/questions-create/questions-create.component';
import { QuizCreateComponent } from '../../../../src/app/Components/Quiz/quiz-create/quiz-create.component';
import { QuizCreationComponent } from '../../../../src/app/Components/Quiz/quiz-creation/quiz-creation/quiz-creation.component';
import { QuizListComponent } from '../../../../src/app/Components/Quiz/quiz-list/quiz-list.component';
import { QuizComponent } from '../../../../src/app/Components/Quiz/quiz/quiz/quiz.component';
import { StatisticsComponent } from '../../../../src/app/Components/Quiz/statistics/statistics/statistics.component';
import { UserListComponent } from '../../../../src/app/Components/Institutions/add-institution/user-list/user-list/user-list.component';
import { QuestionByCategoryComponent } from '../../../../src/app/Components/Quiz/questionbycategory/questionbycategory.component';
import { AssignBatchQuizComponent } from '../../../../src/app/Components/Institutions/assign-batch-quiz/assign-batch-quiz.component';
import { ResultPageComponent } from '../../../../src/app/result-page/result-page.component';
import { ResultScreenShotComponent } from '../../../../src/app/result-screen-shot/result-screen-shot.component';
import { LoggerComponent } from '../../../../src/app/logger/logger.component';
import { ResultKeyCountComponent } from 'src/app/result-key-count/result-key-count.component';


export const content: Routes = [
  {
    path: 'home',component:DashboardComponent,
    data: {
      breadcrumb: "Products"
    }
  },
  {
    path: 'profile',component:SettingsComponent,
    data: {
      breadcrumb: "Profile"
    }
  },

  {
    path: 'quizCreate',component:QuizCreateComponent,
    data: {
      breadcrumb: "quizCreate"
    }
  },
  {
    path: 'quizList',component:QuizListComponent,
    data: {
      breadcrumb: "quizList"
    }
  },
  {
    path: 'questionsCreate',component:QuestionsCreateComponent,
    data: {
      breadcrumb: "questionsCreate"
    }
  },
  {
    path: 'addinstitution',component:AddInstitutionComponent,
    data: {
      breadcrumb: "addInstitution"
    }
  },
  {
    path: 'adduser',component:AddUserComponent,
    data: {
      breadcrumb: "adduser"
    }
  },
  {
    path: 'adduserdetails',component:AddUserDetailsComponent,
    data: {
      breadcrumb: "adduserdetails"
    }
  },
  {
    path: 'adduserdetails/:id',component:AddUserDetailsComponent,
    data: {
      breadcrumb: "adduserdetails"
    }
  },
  {
    path: 'userlist',component:UserListComponent,
    data: {
      breadcrumb: "userlist"
    }
  },
  {
    path: 'userlist/:id',component:UserListComponent,
    data: {
      breadcrumb: "userlist"
    }
  },
  {
    path: 'quiz/:id',component:QuizCreationComponent,
    data: {
      breadcrumb: "quiz"
    }
  },
  {
    path: 'template',component:QuizCreateComponent,
    data: {
      breadcrumb: "template"
    }
  },
  {
    path: 'template/:id',component:QuizCreateComponent,
    data: {
      breadcrumb: "template"
    }
  },
  {
    path: 'questions/:id',component:QuizComponent,
    data: {
      breadcrumb: "questions"
    }
  },
  {
    path: 'adduser/:id',component:AddUserComponent,
    data: {
      breadcrumb: "adduser"
    }
  },
  {
    path: 'copyquestions',component:CopyQuestionsComponent,
    data: {
      breadcrumb: "copyquestions"
    }
  },
  {
    path: 'editquestion',component:EditQuestionComponent,
    data: {
      breadcrumb: "editquestion"
    }
  },
  {
    path: 'question/:id',component:EditQuestionComponent,
    data: {
      breadcrumb: "editquestion"
    }
  },
   {
    path: 'statistics',component:StatisticsComponent,
    data: {
      breadcrumb: "statistics"
    }
  },
  {
    path: 'leaderboard',component:LeaderBoardComponent,
    data: {
      breadcrumb: "leaderboard"
    }
  },
  {
    path: 'category',component:CategoryComponent,
    data: {
      breadcrumb: "Category"
    }
  }, {
    path: 'category/:id',component:CategoryComponent,
    data: {
      breadcrumb: "Category"
    }
  },
  {
    path: 'questionbycategory',component:QuestionByCategoryComponent,
    data: {
      breadcrumb: "QuestionbyCategory"
    }
  },
  {
    path: 'questionbycategory/:id',component:QuestionByCategoryComponent,
    data: {
      breadcrumb: "QuestionbyCategory"
    }
  },
  {
    path: 'assignbatchquiz',component:AssignBatchQuizComponent,
    data: {
      breadcrumb: "AssignBatchQuiz"
    }
  },

  {
    path: 'result',component:ResultPageComponent,
    data: {
      breadcrumb: "Result"
    }
  },
  {path:'screenShot',component:ResultScreenShotComponent,
data:{
  breadcrumb: "screenShot"
}},
{path:'screenShot/:id',component:ResultScreenShotComponent,
data:{
  breadcrumb: "screenShot"
}},

{
  path: 'logger',component:LoggerComponent,
  data: {
    breadcrumb: "Logger"
  }
},

{path:'keyCount',component:ResultKeyCountComponent,
data:{
  breadcrumb: "keyCount"
}},
{path:'keyCount/:id',component:ResultKeyCountComponent,
data:{
  breadcrumb: "keyCount"
}}

];