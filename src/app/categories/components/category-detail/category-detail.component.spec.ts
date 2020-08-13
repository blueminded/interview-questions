import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailComponent } from './category-detail.component';
import { QuestionService } from '../../../questions/services/question.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { IQuestion } from '../../../models/data.model';

describe('CategoryDetailComponent', () => {
  let component: CategoryDetailComponent;
  let fixture: ComponentFixture<CategoryDetailComponent>;
  let questionServiceMock: any;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    questionServiceMock = jasmine.createSpyObj('QuestionService', [
      'getQuestions',
    ]);

    questionServiceMock.getQuestions.and.returnValue({
      subscribe: () => {
        return [];
      },
    });

    TestBed.configureTestingModule({
      declarations: [CategoryDetailComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: QuestionService, useValue: questionServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailComponent);
    route = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render category title', () => {
    component.category = 'demo category';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('h1'));
    const categoryName = element.nativeElement.textContent;
    expect(categoryName).toBe('Category : Demo Category');
  });

  it('Should display No questions when empty category', () => {
    fixture.detectChanges();

    const h2Element = fixture.debugElement.query(By.css('h2'));
    const h2ElementText = h2Element.nativeElement.textContent;
    expect(h2ElementText).toBe('Not questions found');
  });
});

describe('CategoryDetailComponent List', () => {
  let component: CategoryDetailComponent;
  let fixture: ComponentFixture<CategoryDetailComponent>;
  let questionServiceMock: any;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    questionServiceMock = jasmine.createSpyObj('QuestionService', [
      'getQuestions',
    ]);

    questionServiceMock.getQuestions.and.returnValue({
      subscribe: () => {
        const question: IQuestion = {
          id: 'id',
          question: 'Dummy item',
          answers: [{ answer: 'This is a demo answer' }],
          date: '2020-08-10T19:07:28.795Z',
          categories: [{ category: 'Demo category' }],
        };

        component.questions.push(question);
      },
    });

    TestBed.configureTestingModule({
      declarations: [CategoryDetailComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: QuestionService, useValue: questionServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailComponent);
    route = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render at least  1 question in category detail', () => {
    fixture.detectChanges();
    const questions = fixture.debugElement.queryAll(By.css('.card'));
    console.log(questions);

    expect(questions.length).toBe(1);
  });
});
