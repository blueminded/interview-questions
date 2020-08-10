import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsModule } from '../questions/questions.module';

@NgModule({
  declarations: [CategoryDetailComponent],
  imports: [CommonModule, QuestionsModule],
  exports: [CategoryDetailComponent],
})
export class CategoriesModule {}
