import { Injectable } from '@angular/core';
import { ICategory, IQuestion, IAnswer } from '../../models/data.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API_URL } from '../../global';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getRecentQuestions() {
    return this.http
      .get(
        `${BASE_API_URL}/questions?page=1&limit=10&sortBy=createdAt&order=desc`
      )
      .pipe(
        map((resp) => {
          const questions: IQuestion[] = [];

          if (resp === null) {
            return [];
          }

          Object.keys(resp).forEach((key) => {
            const question: IQuestion = resp[key];
            questions.push(question);
          });

          return questions;
        })
      );
  }

  getQuestion(id: string) {
    return this.http.get(`${BASE_API_URL}/questions/${id}`).pipe(
      map((resp: any) => {
        const question: IQuestion = { ...resp };
        return question;
      })
    );
  }

  getDefaultAnswerQuestion(id: string) {
    return this.http
      .get(`${BASE_API_URL}/questions/${id}/answers?limit=1`)
      .pipe(
        map((resp) => {
          const answer: IAnswer = resp[0];
          return answer;
        })
      );
  }
  updateDefaultAnswer(answer: IAnswer) {
    return this.http
      .put(
        `${BASE_API_URL}/questions/${answer.questionId}/answers/${answer.id}`,
        answer
      )
      .pipe(
        map((resp: IAnswer) => {
          const updatedAnswer: IAnswer = resp;
          return updatedAnswer;
        })
      );
  }

  getAnswersQuestion(id: string) {
    return this.http.get(`${BASE_API_URL}/questions/${id}/answers`).pipe(
      map((resp) => {
        const answers: IAnswer[] = [];

        if (resp === null) {
          return [];
        }

        Object.keys(resp).forEach((key) => {
          const answer: IAnswer = resp[key];
          answers.push(answer);
        });

        return answers;
      })
    );
  }

  saveQuestion(question: IQuestion) {
    return this.http.post(`${BASE_API_URL}/questions`, question).pipe(
      map((resp: IQuestion) => {
        question = resp;
        return question;
      })
    );
  }

  updateQuestion(question: IQuestion) {
    return this.http
      .put(`${BASE_API_URL}/questions/${question.id}`, question)
      .pipe(
        map((resp: IQuestion) => {
          question = resp;
          return question;
        })
      );
  }

  deleteQuestion(question: IQuestion) {
    return this.http.delete(`${BASE_API_URL}/questions/${question.id}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  deleteAnswerQuestion(questionId: string, answerId: string) {
    return this.http.delete(
      `${BASE_API_URL}/questions/${questionId}/answers/${answerId}`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  saveAnswer(answer: IAnswer) {
    return this.http
      .post(`${BASE_API_URL}/questions/${answer.questionId}/answers`, answer)
      .pipe(
        map((resp: IAnswer) => {
          answer = resp;
          return answer;
        })
      );
  }
}
