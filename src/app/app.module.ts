import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InitComponent } from './init.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionComponent } from './question-list/question/question.component';
import { QuestionService } from './services/question.service';
import { SummaryComponent } from './summary/summary.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotfoundComponent } from './pageNotfound/notfound.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { TextTransformPipe } from './text-transform.pipe'

@NgModule({
  declarations:[
      AppComponent,
      InitComponent,
      QuestionComponent,
      QuestionListComponent,
      SummaryComponent,
      NotfoundComponent,
      TextTransformPipe
    ],
  imports: [
    RouterModule.forRoot([
    { path: '', component: InitComponent },
    { path: 'question', component: QuestionListComponent },
    {
        path: 'question/:index',
        component: QuestionListComponent,
    },
    { path: 'summary', component: SummaryComponent },
    { path: '**', component: NotfoundComponent }
]),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    QuestionService,
    DataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
