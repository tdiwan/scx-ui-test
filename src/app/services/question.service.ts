import { Injectable } from '@angular/core';
import { QuestionModel, UserAnswer } from '../../models';
import { Observable, of } from 'rxjs';
import { DataService } from './data.service';

@Injectable()
export class QuestionService {
  
  public result:any;
  questions: QuestionModel[];
  noOfQuestions: number;
  userAnswers: UserAnswer[] = [];
  serviceResult:any;
  endPointData:any;

  constructor(private service:DataService) {
    this.service.getData().subscribe(
      data => {
        this.endPointData = data;
        this.questions = this.service.generateQuestionDataModel(this.endPointData);
        this.noOfQuestions = this.questions.length;
      }
    )
  } 

  getQuestionList() {
    return of(this.questions);
  }

  //find the correct answer and verify
  pushAnswer(questionId: number, answerId: number) {
    const quest = this.questions.find(f => f.index == questionId);
    if (quest) {
      const isCorrect = quest.answer == answerId;
      const ans = this.userAnswers.find(f => f.questionId == questionId);
      if (ans) {
        ans.answerId = answerId;
        ans.isCorrect = isCorrect;
      }
      else {
        this.userAnswers.push(
          {
            questionId,
            answerId,
            isCorrect
          }
       )
      }
    }
  }
}