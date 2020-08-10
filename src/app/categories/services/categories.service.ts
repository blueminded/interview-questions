import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { IQuestion, ICategory } from '../../models/data.model';
import { BASE_API_URL } from '../../global';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategory(id: string) {
    return this.http.get(`${BASE_API_URL}/categories/${id}`).pipe(
      map((resp: any) => {
        const category: ICategory = { ...resp };
        return category;
      })
    );
  }

  getCategories() {
    return this.http.get(`${BASE_API_URL}/categories`).pipe(
      map((resp) => {
        const categories: ICategory[] = [];

        if (resp === null) {
          return [];
        }

        Object.keys(resp).forEach((key) => {
          const category: ICategory = resp[key];

          categories.push(category);
        });

        return categories;
      })
    );
  }

  saveCategory(category: ICategory) {
    return this.http.post(`${BASE_API_URL}/categories`, category).pipe(
      map((resp: ICategory) => {
        category = resp;
        return category;
      })
    );
  }

  getCategoryQuestions(id: string) {
    return this.http.get(`${BASE_API_URL}/questions?categoryId=${id}`).pipe(
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
}
