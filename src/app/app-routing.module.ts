import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginDesignComponent } from './Components/login-design/login-design.component';
import { QuestionViewComponent } from './Components/Quiz/question-view/question-view/question-view.component';
import { ViewUserAnswerComponent } from './Components/Quiz/view-user-answer/view-user-answer/view-user-answer.component';
import { ContentLayoutComponent } from './Shared/components/content-layout/content-layout.component';
import { content } from './Shared/routes/content-routes';
import { CategoryComponent } from './Components/Quiz/category/category.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LastlandingpageComponent } from './lastlandingpage/lastlandingpage.component';
import { ResultScreenShotComponent } from './result-screen-shot/result-screen-shot.component';
import { AuthGuard } from './Shared/guard/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'/login', pathMatch: 'full'},
  {path:'login',component:LoginDesignComponent},
  {path:'dashboard',component:ContentLayoutComponent,canActivate:[AuthGuard],
  children: content
},
{path:'questionview',component:QuestionViewComponent,canActivate:[AuthGuard]},
{path:'viewuseranswer',component:ViewUserAnswerComponent,canActivate:[AuthGuard]},
{path:'category',component:CategoryComponent,canActivate:[AuthGuard]},
{path:'landing',component:LandingpageComponent,canActivate:[AuthGuard]},
{path:'lastlanding',component:LastlandingpageComponent,canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
