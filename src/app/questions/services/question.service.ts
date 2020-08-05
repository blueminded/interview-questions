import { Injectable } from '@angular/core';
import { someCategories, ICategory, Iquestion } from '../../models/data.model';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  categories: Array<ICategory> = someCategories;
  questions: Array<Iquestion>;

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

  saveQuestion(incomingQuestion: string) {
    // this.questions.push(incomingQuestion);
  }

}
