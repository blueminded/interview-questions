import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { NewQuestionComponent } from './components/new-question/new-question.component';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../questions/services/question.service';

@NgModule({
  declarations: [
    QuestionDetailComponent,
    NewQuestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule  
  ]
})
export class QuestionsModule {}
