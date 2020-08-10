import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { QuestionsModule } from '../questions/questions.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    QuestionsModule
  ]
})
export class HomeModule { }
