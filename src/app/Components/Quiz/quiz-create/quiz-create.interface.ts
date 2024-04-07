export interface IQuizCreate {
    
    templateName: string,
    timeLimit: number,
    templatedata:IQuizdata,
    frontPageHtml: string,
    resultPageHtml: string

}

export interface IQuizdata {

    quizExecution: boolean,
    quizOverview: boolean,
    regUsersOnly: boolean
    
}
