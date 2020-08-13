import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { NewQuestionComponent } from './components/new-question/new-question.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuestionDetailComponent,
    NewQuestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QuestionsModule {}
