import { QuestionListComponent } from './components/question-list/question-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { NewQuestionComponent } from './components/new-question/new-question.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuestionDetailComponent,
    NewQuestionComponent,
    QuestionListComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [QuestionListComponent],
})
export class QuestionsModule {}
