import { Injectable } from '@angular/core';
import { someCategories, ICategory, IQuestion, IAnswer } from '../../models/data.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  categories: Array<ICategory> = [];
  questions: Array<IQuestion>;
  categoriesArrayId: string = null;

  constructor(private httpClient: HttpClient) { }

  getQuestionById(id : string) {
    return this.httpClient.get(`https://question-bank-6ffba.firebaseio.com/questions/${id}.json`)
    .pipe(
      map((response : IQuestion) => {
        return response;
      })
    );
  }

  getQuestions() {
    return this.httpClient.get('https://question-bank-6ffba.firebaseio.com/questions.json')
      .pipe(
        map(response => {
          return this.toArray(response);
        })
      );
  }

  getCategories() {
    return this.httpClient.get('https://question-bank-6ffba.firebaseio.com/categories.json')
      .pipe(
        map(answer => {
          this.getCategoriesArrayId(answer);
          this.categories = answer[this.categoriesArrayId];

          return this.categories;
        }));
  }

  saveQuestion(newQuestion: IQuestion) {
    this.httpClient.post('https://question-bank-6ffba.firebaseio.com/questions.json', newQuestion)
      .subscribe(response => {
        console.log(response);
      });
  }

  addCategry(newCategory: Array<ICategory>) {
    if (this.categories.length) {
      this.categories = this.categories.concat(newCategory);
    }
    console.log(this.categories, newCategory);
    this.httpClient.put(`https://question-bank-6ffba.firebaseio.com/categories/${this.categoriesArrayId}.json`, this.categories)
      .subscribe(response => {
        console.log(response);
      });
  }

  compareCategories() {

  }

  getCategoriesArrayId(answer: object) {
    const ids: string[] = Object.keys(answer);
    this.categoriesArrayId = ids[0];
  }

  toArray(response: object) {
    const questionArray: IQuestion[] = [];
    for (const key in response) {
      if (response.hasOwnProperty(key)) {
        const element = response[key];
        element.id = key;
        questionArray.push(element);
      }
    }
    return questionArray;
  }

  addNewAnswer(question : IQuestion, questionId : string) {
    this.httpClient.put(`https://question-bank-6ffba.firebaseio.com/questions/${questionId}.json`, question)
    .subscribe(response => {
      console.log(response);
    });
  }

  deleteQuestion(questionId : string) {
    return this.httpClient.delete(`https://question-bank-6ffba.firebaseio.com/questions/${questionId}.json`);
  }
}
