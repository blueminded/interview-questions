import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { NewQuestionComponent } from './new-question.component';
import { QuestionService } from '../../services/question.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IQuestion } from '../../../models/data.model';

describe('NewQuestionComponent', () => {
  let component: NewQuestionComponent;
  let fixture: ComponentFixture<NewQuestionComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NewQuestionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewQuestionComponent],
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(NewQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should bring the categories from the question service', () => {
    const categories = [
      {
        category: 'Angular',
        id: 'a_0145asbu00',
      },
      {
        category: 'Javascript',
        id: 'y_010076abxxy',
      },
      {
        category: 'Node Js',
        id: 'r_0145as88767',
      },
    ];

    inject(
      [HttpTestingController, QuestionService],
      (httpMock: HttpTestingController, service: QuestionService) => {
        service.getCategories().subscribe((data) => {
          expect(data).not.toBeNull();
        });

        const req = httpMock.expectOne(
          (req) =>
            req.method === 'GET' &&
            req.url ===
              'https://question-bank-6ffba.firebaseio.com/categories.json'
        );

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).not.toBeNull();

        req.flush({ categories });
      }
    );
  });

  it('Should bring the questions from the question service', () => {
    inject(
      [HttpTestingController, QuestionService],
      (httpMock: HttpTestingController, service: QuestionService) => {
        service.getQuestions().subscribe((data) => {
          expect(data).not.toBeNull();
        });

        const req = httpMock.expectOne(
          (req) =>
            req.method === 'GET' &&
            req.url ===
              'https://question-bank-6ffba.firebaseio.com/questions.json'
        );

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).not.toBeNull();
      }
    );
  });

  it('Should insert the questions from the question service', () => {
    const question: IQuestion = {
      answers: [
        {
          answer: 'My favourite Color is Blue.',
        },
      ],
      categories: [
        {
          category: 'Colors',
        },
      ],
      question: 'What is your favourite color?',
    };

    inject(
      [HttpTestingController, QuestionService],
      (httpMock: HttpTestingController, service: QuestionService) => {
        service.saveQuestion(question).subscribe((data) => {
          expect(data).not.toBeNull();
        });

        const req = httpMock.expectOne(
          (req) =>
            req.method === 'POST' &&
            req.url ===
              'https://question-bank-6ffba.firebaseio.com/questions.json'
        );

        expect(req.request.method).toEqual('POST');
        expect(req.request.body).not.toBeNull();
      }
    );
  });

  it('Should update the questions from the question service', () => {
    const question: IQuestion = {
      answers: [
        {
          answer: 'My favourite Color is Blue.',
        },
      ],
      categories: [
        {
          category: 'Colors',
        },
      ],
      question: 'What is your favourite color?',
    };

    const questionID: string = '-WDDFGTRY34545DSFGER';

    inject(
      [HttpTestingController, QuestionService],
      (httpMock: HttpTestingController, service: QuestionService) => {
        service.updateQuestion(question, questionID).subscribe((data) => {
          expect(data).not.toBeNull();
        });

        const req = httpMock.expectOne(
          (req) =>
            req.method === 'PUT' &&
            req.url ===
              `https://question-bank-6ffba.firebaseio.com/questions/${questionID}.json`
        );

        expect(req.request.method).toEqual('PUT');
        expect(req.request.body).not.toBeNull();
      }
    );
  });
});
