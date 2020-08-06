import { Injectable } from '@angular/core';
import { someCategories, ICategory, IQuestion } from '../../models/data.model';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  categories: Array<ICategory> = someCategories;
  questions: Array<IQuestion>;

  constructor() { }

  getQuestionById () {
    // TBD
  }

  getQuestions() {
    return this.categories;
  }

  getCategories() {
    return this.categories;
  }

  saveQuestion(newQuestion: IQuestion) {
    console.log(newQuestion);    
  }

}
