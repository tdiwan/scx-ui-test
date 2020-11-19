import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { QuestionModel } from 'src/models';
@Injectable({
  providedIn: 'root'
})

export class DataService {
  private endPointURL = 'http://localhost:4000/api/questions';

  constructor(private http:HttpClient) { }
  
  getData(): Observable<QuestionModel[]>{
     return this.http.get<QuestionModel[]>(this.endPointURL);
  }
  
  //shuffle options everytime
  shuffle(arra1) {
    let ctr = arra1.length;
    let temp;
    let index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

getObjects(arr){
  let newArr=[];
  for(let i = 0;i<arr.length;i++){
    let obj:any = {};
    obj.name = arr[i];
    obj.id = i+1;
    newArr.push(obj);
}  
  return newArr;
}

createQuestionDataModel(obj,objIndex){
  let newObj:any = {};
  let tempIndex;
  let incAnsArr;
  if(obj.incorrect_answers == undefined){
    let textArr = [];
    textArr.push(obj.correct_answer);
    newObj.question = obj.question;
    newObj.answer = 1;
    newObj.index = objIndex + 1;
    newObj.options = this.getObjects(textArr);
  }
  else{
    incAnsArr = obj.incorrect_answers;
    let corrAnsArr = obj.correct_answer;
    incAnsArr.push(corrAnsArr);
    let arr  = this.shuffle(incAnsArr);
    newObj.options = this.getObjects(arr);
    tempIndex = newObj.options.findIndex(x => x.name === obj.correct_answer)
    newObj.question = obj.question;
    newObj.answer = tempIndex + 1;
    newObj.index = objIndex + 1;
  }
  //console.log('Modified Object :',newObj);
  return newObj;
} 

generateQuestionDataModel(currObj){
  let arr = currObj.results;
  //todo : needs refactor
  arr = arr.slice(0,4);
  let generatedArray = [];
  for(let i=0;i<arr.length;i++){
    let temp = this.createQuestionDataModel(arr[i],i);
    generatedArray.push(temp);
  }
  return generatedArray;
}
}
