import { Component, OnInit } from '@angular/core';

// Model
import { ICategory, IQuestion } from '../../../models/data.model';

// Services
import { QuestionService } from '../../services/question.service';
import { NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css'],
})
export class NewQuestionComponent implements OnInit {
  singleCategory : ICategory = { id: null, category: null };
  categories: Array<ICategory>;
  answer : string;
  questionCategories: Array<ICategory> = [];
  questionAlert : boolean = false;
  categoryAlert : boolean = false;
  question: IQuestion = new IQuestion();

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.categories = this.questionService.getCategories();
  }

  categoryChange(category: string) {
    this.questionCategories.push({ category });
  }

  saveQuestion() {
    if (this.inputValidate()) {
      console.log('in here');
      this.question.answers.push(this.answer);
      this.question.categories = this.questionCategories;
      this.questionService.saveQuestion(this.question);
      
    }
  }

  removeCategory(index : number) {
    this.questionCategories.splice(index, 1);
  }

  addNewCategory(category : string) {
    if (category && category.split(' ').join('')) {
      this.questionCategories.push({ category });
    }
  }

  inputValidate() : boolean {
    if (!this.question.question) {
      this.questionAlert = true;
      return false;
    }
    if (!this.questionCategories.length) {
      this.categoryAlert = true;
      return false;
    }
    return true;
  }

}
