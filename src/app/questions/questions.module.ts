import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { NewQuestionComponent } from './components/new-question/new-question.component';

@NgModule({
  declarations: [QuestionDetailComponent, NewQuestionComponent],
  imports: [CommonModule],
})
export class QuestionsModule {}
