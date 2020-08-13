import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestionComponent } from './new-question.component';
import { QuestionService } from '../../services/question.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IQuestion } from '../../../models/data.model';
import { ActivatedRoute } from '@angular/router';

describe('EditQuestionComponent', () => {
  let component: NewQuestionComponent;
  let fixture: ComponentFixture<NewQuestionComponent>;
  let questionServiceMock: any;

  beforeEach(async(() => {
    questionServiceMock = jasmine.createSpyObj('QuestionService', [
      'getCategories',
      'getQuestionById',
    ]);

    questionServiceMock.getCategories.and.returnValue({
      subscribe: () => {
        component.categories = [
          { category: 'Demo Category 1' },
          { category: 'Demo Category 2' },
          { category: 'Demo Category 3' },
        ];
      },
    });

    questionServiceMock.getQuestionById.and.returnValue({
      subscribe: () => {
        const response: IQuestion = {
          id: 'demo Id',
          img: 'dummy img',
          question: '¿What is Angular?',
          answers: [{ id: 'question id', answer: 'first dummy answer' }],
          date: 'Answer date',
          categories: [
            { category: 'Demo Category 1' },
            { category: 'Demo Category 2' },
          ],
        };
        component.question = response;
        component.questionCategories = response.categories;
        component.answer = response.answers[0];
      },
    });

    TestBed.configureTestingModule({
      declarations: [NewQuestionComponent],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        { provide: QuestionService, useValue: questionServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 1, // represents the bookId
              },
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should display Edit the question when editing', () => {
    component.edit = true;
    component.titleForm = 'Edit the question';

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('h2'));
    const categoryName = element.nativeElement.textContent;
    expect(categoryName).toBe('Edit the question');
  });

  it('Should display the question to edit', async(() => {
    component.edit = true;
    component.titleForm = 'Edit the question';

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const element = fixture.debugElement.query(
        By.css('input[name=question]')
      );
      const inputText = element.nativeElement.value;
      expect(inputText).toEqual(component.question.question);
    });
  }));
});
