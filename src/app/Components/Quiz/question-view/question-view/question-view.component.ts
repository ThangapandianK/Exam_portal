import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';

import { MILLI_SECONDS } from '../../../../../../src/app/Shared/constant/constant';
import { CommanService } from '../../../../../../src/app/Shared/service/comman.service';
import { EncryptionService } from '../../../../../../src/app/Shared/service/encryption.service';


@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent implements OnInit {
  quesNos: any;
  selectedQuestion: number = 1;
  selectedAns: number = 1;
  questionText: any;
  timeLimit: string = "00:00:00";
  quetionTimer: string = "100%";
  setTime: any;
  keypressCount: number = 0;
  questionNumber: any;
  answerChoosed: any;
  tempId:any;

  ctrlKeyCount: number = 0;
  shiftKeyCount: number = 0;
  altKeyCount: number = 0;
  escKeyCount: number = 0;
  f11KeyCount: number = 0;
  enterKeyCount: number = 0;
  keycount :any;
  
  quizData: any;
  answerLists: any;
  questions: any[] = [];
  userQuestions: any[] = [];
  userAnswer: any[] = [];
  questionOption: any[] = [];
  answerListLength: any;
  isCorrectAnswer: any;
  sec: any;
  totalTakenTime: any
  limitedTime: any;
  candidateId: any
  captures: Array<any> = [];

  @Output()
  public imageClicked = new EventEmitter<WebcamImage>();
  public errors: WebcamInitError[] = [];
  private cameraClick: Subject<void> = new Subject<void>();
  assignFunction: any;
  imgpath: any;
  userAnswers: any;
  userQuestion: any
  listAnswer: any;
  quizId: any
  questionList: any[] = []
  SendingAns: any
  constructor(public router: Router, public commonService: CommanService,private encryptionService: EncryptionService) { }


  ngOnInit(): void {
    // Retrieve the encrypted data from local storage
    const encryptedDataString = localStorage.getItem('encryptedData');
  
    if (encryptedDataString !== null) {
      // Parse the JSON string to get the encrypted data object
      const encryptedData = JSON.parse(encryptedDataString);
  
      // Decrypt the data using the EncryptionService
      this.candidateId = this.encryptionService.decrypt(encryptedData.candidateId);
      this.quizId = this.encryptionService.decrypt(encryptedData.quizId);
  
     
    } else {
      
    }
  
    this.takePicture();
    setInterval(() => {
      this.takePicture();
    }, MILLI_SECONDS);
  
    this.getallQuiz();
  }
  
// HostListener for key events

@HostListener('window:keydown', ['$event'])

onKeyPress(event: KeyboardEvent) {

  if (event.ctrlKey) {

    this.ctrlKeyCount++;

  }

  if (event.shiftKey) {

    this.shiftKeyCount++;


  }

  if (event.altKey) {

    this.altKeyCount++;

  }

  if (event.key === 'Escape') {

    this.escKeyCount++;

  }

  if (event.key === 'F11') {

    this.f11KeyCount++;

  }

  if (event.key === 'Enter') {

    this.enterKeyCount++;

  }



  this.keycount={

    "ctrl":""+this.ctrlKeyCount+"",
 
    "shift":""+this.shiftKeyCount+"",
 
    "alt":""+this.altKeyCount+"",
 
    "esc":""+this.escKeyCount+"",
 
    "f11":""+this.f11KeyCount+"",
 
    "enter":""+this.enterKeyCount+""
 
   }

}

  public getallQuiz() {
    //this.quizId =localStorage.getItem('quizId');
    this.commonService.quizGetAll(this.quizId).subscribe(data => {

      this.quizData = data
      this.tempId = this.quizData.data.quizTemplateId
      this.templeteGetID(this.tempId)
      this.quizData = this.quizData.data.questions
      this.quesNos = this.quizData.length
      for (let i = 0; i < this.quizData.length; i++) {
        this.commonService.quizGetByID(this.quizData[i]?.questionId).subscribe(data => {
          this.answerLists = data         
          this.answerLists = this.answerLists.data.answerList
          this.answerListLength = this.answerLists.length
          const listQuestion = {
            "questionId": this.quizData[i]?.questionId,
            "AnswerList": this.answerLists
          }
          this.questionList.push(listQuestion)
          this.questionOption = [];
          this.isCorrectAnswer = ""
          for (let j = 0; j < this.answerListLength; j++) {
            if (this.answerLists[j].isCorrect == 1) {
              this.isCorrectAnswer = this.answerLists[j].answers
            } else {

            }
            const dd = this.answerLists[j]?.answers;
            this.questionOption.push(dd)
          }
          const objectData = {
            questionNumber: this.quizData[i]?.questionId,
            questionText: this.quizData[i]?.description,
            options: this.questionOption,
            correctAnswer: this.isCorrectAnswer,
            answerd: false,
            review: false,
            selectedAnswer: "",
            
          }
          this.questions.push(objectData);
        })
      }
    })
    this.onSelectQuestion(0);
  }

  onSelectQuestion(selectedQuestionIndex: number) {
    let selectedQuestion = this.questions[selectedQuestionIndex];
    this.selectedQuestion = selectedQuestionIndex + 1;
    if (this.questions[this.selectedQuestion - 1].selectedAnswer) {
      this.answerChoosed = this.questions[this.selectedQuestion - 1].selectedAnswer;
     
    }

  }
  goBack() {
    this.onSelectQuestion(this.selectedQuestion - 2);
  }

  goNext() {
    this.onSelectQuestion(this.selectedQuestion);
  }

  goFinish() {

    this.answerSubmit()
    this.convert(this.sec)
  }

  convert(sec: any) {
    var H1, M1, S1;
    if (sec == -1) {
      H1 = Math.floor(this.limitedTime / 3600);
      M1 = Math.floor((this.limitedTime % 3600) / 60);
      S1 = this.limitedTime % 60;
    } else {
      var hours = Math.floor(sec / 3600);
      var minutes = Math.floor((sec % 3600) / 60);
      var remainingSeconds = sec % 60;
      var sec1 = this.limitedTime
      var hours1 = Math.floor(sec1 / 3600);
      var minutes1 = Math.floor((sec1 % 3600) / 60);
      var remainingSeconds1 = sec1 % 60;
      const time1InSeconds = hours * 3600 + minutes * 60 + remainingSeconds;
      const time2InSeconds = hours1 * 3600 + minutes1 * 60 + remainingSeconds1;
      const timeDifferenceInSeconds = Math.abs(time2InSeconds - time1InSeconds);
      H1 = Math.floor(timeDifferenceInSeconds / 3600);
      M1 = Math.floor((timeDifferenceInSeconds % 3600) / 60);
      S1 = timeDifferenceInSeconds % 60;
    }
    this.totalTakenTime = H1 + ":" + M1 + ":" + S1;

  }


  answer(ans1: any, ans2: any) {

    for (let j = 0; j < ans1.AnswerList.length; j++) {
      if (ans1.AnswerList[j].answers === ans2.selectedAnswer) {
        this.userAnswers = {
          "answers": ans1.AnswerList[j].answers,
          "answersId": ans1.AnswerList[j].answersId,
          "isCorrect": 1
        }
        return this.userAnswers
      } else {
        this.userAnswers = {
          "answers": '',
          "answersId": 0,
          "isCorrect": 1
        }
      }
    }
    return this.userAnswers


  }
  answerList() {
    // this.LisAns=this.LisAns.data
    this.listAnswer = this.questionList
    for (let i = 0; i < this.listAnswer.length; i++) {

      if (this.listAnswer[i]?.questionId === this.questions[i]?.questionNumber) {
        this.SendingAns = this.answer(this.listAnswer[i], this.questions[i])
      }
      this.userQuestion = {
        "questionId": this.questions[i]?.questionNumber,
        "answerList": this.SendingAns,
        "timeTaken": 0,
        "markObtained": 0
      }
      this.userQuestions.push(this.userQuestion)
    }
    return this.userQuestions;
  }
  answerSubmit() {
    this.answerList();
    this.userChoice();
  }
  userChoice() {
    const payload = {
      "userId": this.candidateId,
      "quizId": this.quizId,
      "userAnswerDetail": this.userQuestions,
      "keyboard":  this.keycount? this.keycount: {},
      "screenShot": {},
      "totalMark": 0
    }
     // Encrypt the payload using the EncryptionService
  const encryptedPayload = this.encryptionService.encrypt(payload);

  // Store the encrypted payload in localStorage
  localStorage.setItem('myData', encryptedPayload);
    this.router.navigate(['/lastlanding']);
  }



  /**
   * selectedQuestion === r+1 ? 'border-dark':''
   */

  setBackground(questionIndx: number) {
    let retClass: string = "bg-white";
    if (this.questions[questionIndx].review) {
      retClass += ' bg-warning';
    } else if (this.questions[questionIndx].answerd) {
      retClass = ' bg-success';
    }
    if (this.selectedQuestion === questionIndx + 1) {
      retClass += " border-info selected-question";
    }
    return retClass;
  }

  setAnswer() {
    this.questions[this.selectedQuestion - 1].answerd = true;
    this.questions[this.selectedQuestion - 1].selectedAnswer = this.answerChoosed;

  }

  reviewQuestion() {
    this.questions[this.selectedQuestion - 1].review = this.questions[this.selectedQuestion - 1].review ? false : true;
  }


  templeteGetID(id: any) {
    this.commonService.quizTempleteGetID(id).subscribe(data => {
      this.limitedTime = data;
      this.limitedTime = this.limitedTime.data.timeLimit;
      this.processTime(this.limitedTime);

    })
  }
  processTime(timeSec: any) {
    //Set Time In Exam time
    this.sec = timeSec;
    var timeLim = this.sec ? this.sec : 0;
    this.setTime = setInterval(() => {
      //60 sec = 1 m;1sec = m/60; hr = 60 m; 
      this.sec = this.sec ? this.sec : 0;
      this.timeLimit = `${String(Math.floor(this.sec / (60 * 60))).padStart(2, '0')}:${String(Math.floor(this.sec / 60) % 60).padStart(2, '0')}:${String(this.sec % 60).padStart(2, '0')}`;
      // if(this.questions[this.selectedQuestion-1].timeLimit) {
      this.quetionTimer = `${(this.sec / timeLim) * 100}%`;
      //  }
      this.sec--;
      if (this.sec === -1) {
        this.convert(this.sec)
        this.answerSubmit()

        clearTimeout(this.setTime);
      }
    }, 1000)
  }




  public takePicture(): void {
    this.cameraClick.next();
  }

  public errorHandler(error: WebcamInitError): void {
    this.errors.push(error);
  }
  public pictureHandler(webcamImage: WebcamImage): void {
    this.saveimage(webcamImage.imageAsDataUrl)
    this.captures.push(webcamImage.imageAsDataUrl);
    this.imageClicked.emit(webcamImage);
  }


  public get clickOnCamera(): Observable<void> {
    return this.cameraClick.asObservable();
  }

  public saveimage(url: any) {


    

    let formData = new FormData();
    formData.append('candidateId', this.candidateId);

    // Convert base64 image data to a blob
    const byteCharacters = atob(url.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    formData.append('ImageUpload', blob, 'screenshot.jpg');

    this.commonService.saveImage(formData).subscribe((data: any) => {
    })
  }

}
