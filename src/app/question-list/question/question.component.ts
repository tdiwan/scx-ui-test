import { UserAnswer } from './../../../models/userAnswer';
import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { QuestionModel } from '../../../models';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnChanges {

  @Input() question: QuestionModel;
  @Input() nextQuestion: number;
  questionCtrl = new FormControl();
  nextUrl: string;
  questionForm: FormGroup;
  get f() { return this.questionForm.controls; }
  isSubmitted: boolean;
  selectedAns:number;

  constructor(private router: Router,
    private svc: QuestionService) { }

  ngOnInit() {

  }
  initForm(question) {
    console.log('initForm Question Obj',question)
    this.isSubmitted = false; 
    const existAnswer = this.svc.userAnswers.find(f=>f.questionId == question.index);
    if(existAnswer){
      this.selectedAns = existAnswer.answerId;
    }
    this.questionForm = new FormGroup({
      answer: new FormControl(this.selectedAns, Validators.required),
    })
    console.log('QuestionForm',this.questionForm)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question && changes.question.currentValue) {
      this.selectedAns = null;
      this.initForm(changes.question.currentValue);
    }
    if (changes.nextQuestion && changes.nextQuestion.currentValue) {
      const nextId = changes.nextQuestion.currentValue;
      if (nextId > 1) {
        this.nextUrl = '../../question/' + (nextId);
      }
      else {
        this.nextUrl = '../../question/' + (nextId);
      }
    }
  }

  onSubmit(formDirective) {
    this.isSubmitted = true;
    if (this.questionForm.valid) {
      
      // for(let i =0;i < this.svc.questions.length ; i++)
      // {
      //   console.log(this.svc.questions[i],i)
      //   this.svc.pushAnswer(this.svc.questions[i].index ,this.svc.questions[i].answer);
      // }
       
        this.svc.pushAnswer(this.question.index, this.questionForm.value.answer);
        //console.log('SVC Array',this.svc);
        if (this.nextQuestion >= 1) {
          this.router.navigateByUrl('question/' + this.nextQuestion);
        }
        else {
          this.router.navigateByUrl('summary')
        }
    }
  }
}