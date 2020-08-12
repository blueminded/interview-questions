import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionListComponent } from './question-list.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { IQuestion } from '../../../models/data.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionListComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main card column div', async () => {
    const element = fixture.debugElement.query(By.css('.card-columns'));
    expect(element).toBeTruthy();
  });

  it('should no renders card items', () => {
    const cardItems = fixture.debugElement.queryAll(By.css('.card'));
    expect(cardItems.length).toBe(0);
  });

  it('should renders at least one card item', () => {
    const list: IQuestion[] = [
      {
        id: '1',
        title: 'Dummy item',
        excerpt: 'This is an excerpt',
        createdAt: '2020-08-10T19:07:28.795Z',
        categoryId: '1',
        img_url: 'http://lorempixel.com/640/480/business/',
      },
    ];

    component.items = list;
    fixture.detectChanges();

    const cardItems = fixture.debugElement.queryAll(By.css('.card'));
    expect(cardItems.length).toBe(1);
  });

  it('should renders 20 card item when we have 20 Questions', () => {
    const list: IQuestion[] = [];

    for (let index = 0; index < 20; index++) {
      const element: IQuestion = {
        id: '1',
        title: 'Dummy item',
        excerpt: 'This is an excerpt',
        createdAt: '2020-08-10T19:07:28.795Z',
        categoryId: '1',
        img_url: 'http://lorempixel.com/640/480/business/',
      };

      list.push(element);
    }

    component.items = list;
    fixture.detectChanges();

    const cardItems = fixture.debugElement.queryAll(By.css('.card'));
    expect(cardItems.length).toBe(20);
  });
});
