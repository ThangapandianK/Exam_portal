import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavService } from './Shared/service/nav.service';
import { EmailvalidatorDirective } from './Shared/directives/validation.directive';
import { PasswordvalidatorDirective } from './Shared/directives/confirmPassword.directive';
import { WINDOW_PROVIDERS } from './Shared/service/windows.service';
import { ToggleFullscreenDirective } from './Shared/directives/fullscreen.directive';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppComponent } from './app.component';
import { FooterComponent } from './Shared/components/footer/footer.component';
import { BreadcrumbComponent } from './Shared/components/breadcrumb/breadcrumb.component';
import { FeatherIconsComponent } from './Shared/components/feather-icons/feather-icons.component';
import { SidebarComponent } from './Shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './Shared/components/header/header.component';
import { RightSidebarComponent } from './Shared/components/right-sidebar/right-sidebar.component';
import { ContentLayoutComponent } from './Shared/components/content-layout/content-layout.component';
import { SettingsComponent } from './Components/commonUI/settings/settings.component';
import { DashboardComponent } from './Components/commonUI/dashboard/dashboard.component';
import { LoginDesignComponent } from './Components/login-design/login-design.component';
import { QuizCreateComponent } from './Components/Quiz/quiz-create/quiz-create.component';
import { QuestionsCreateComponent } from './Components/Quiz/questions-create/questions-create.component';
import { QuizListComponent } from './Components/Quiz/quiz-list/quiz-list.component';
import { AddInstitutionComponent } from './Components/Institutions/add-institution/add-institution/add-institution.component';
import { AddUserComponent } from './Components/Institutions/add-institution/add-user/add-user/add-user.component';
import { AddUserDetailsComponent } from './Components/Institutions/add-institution/add-user-details/add-user-details/add-user-details.component';
import { QuizCreationComponent } from './Components/Quiz/quiz-creation/quiz-creation/quiz-creation.component';
import { QuizComponent } from './Components/Quiz/quiz/quiz/quiz.component';
import { CopyQuestionsComponent } from './Components/Quiz/copy-questions/copy-questions/copy-questions.component';
import { EditQuestionComponent } from './Components/Quiz/edit-question/edit-question/edit-question.component';
import { EditQuestionAnswersComponent } from './Components/Quiz/edit-question/edit-question/edit-question-answers/edit-question-answers.component';
import { StatisticsComponent } from './Components/Quiz/statistics/statistics/statistics.component';
import { LeaderBoardComponent } from './Components/Quiz/leader-board/leader-board/leader-board.component';
import { QuestionViewComponent } from './Components/Quiz/question-view/question-view/question-view.component';
import { ViewUserAnswerComponent } from './Components/Quiz/view-user-answer/view-user-answer/view-user-answer.component';
import { UserListComponent } from './Components/Institutions/add-institution/user-list/user-list/user-list.component';
import { CategoryComponent } from './Components/Quiz/category/category.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { QuestionByCategoryComponent } from './Components/Quiz/questionbycategory/questionbycategory.component';
import { AssignBatchQuizComponent } from './Components/Institutions/assign-batch-quiz/assign-batch-quiz.component';
import { LastlandingpageComponent } from './lastlandingpage/lastlandingpage.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { WebcamModule } from 'ngx-webcam';
import { ResultScreenShotComponent } from './result-screen-shot/result-screen-shot.component';
import { LoggerComponent } from './logger/logger.component';
import { ResultKeyCountComponent } from './result-key-count/result-key-count.component';
import { AuthGuard } from './Shared/guard/auth.guard';
import { AuthService } from './Shared/guard/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    EmailvalidatorDirective,
    ToggleFullscreenDirective,
    FeatherIconsComponent,
    SidebarComponent,
    HeaderComponent,
    RightSidebarComponent,
    ContentLayoutComponent,
    FooterComponent,
    BreadcrumbComponent,
    PasswordvalidatorDirective,
    DashboardComponent,
    SettingsComponent,
    LoginDesignComponent,
    QuizCreateComponent,
    QuestionsCreateComponent,
    QuizListComponent,
    AddInstitutionComponent,
    AddUserComponent,
    AddUserDetailsComponent,
    QuizCreationComponent,
    QuizComponent,
    CopyQuestionsComponent,
    EditQuestionComponent,
    EditQuestionAnswersComponent,
    StatisticsComponent,
    LeaderBoardComponent,
    QuestionViewComponent,
    ViewUserAnswerComponent,
    UserListComponent,
    CategoryComponent,
    LandingpageComponent,
    QuestionByCategoryComponent,
    AssignBatchQuizComponent,
    LastlandingpageComponent,
    ResultPageComponent,
    ResultScreenShotComponent,
    LoggerComponent,
    ResultKeyCountComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    CarouselModule,
    Ng2SmartTableModule,
    CKEditorModule,
    DropzoneModule,
    HttpClientModule,
    AngularEditorModule,
    NgxDatatableModule ,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
    WebcamModule
    
    
  ],
  providers: [NavService, WINDOW_PROVIDERS,AuthGuard,AuthService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
