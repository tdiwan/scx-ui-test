import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  score:number=0;
  total:number;
  isOutOf:boolean;
  ctScore:number=0;
  ctWrongScore:number=0;
  ctFinalScoreInPercentage:any;

  constructor(private svc : QuestionService) {
    this.score = this.svc.userAnswers.filter(f=>f.isCorrect).length;
    this.total = this.svc.noOfQuestions;
    // this.ctWrongScore = this.total - this.score;
    // console.log('Incorrect Answers',this.ctWrongScore)
    this.ctFinalScoreInPercentage = (this.score/this.total)*100;
   }

  ngOnInit() {}

}