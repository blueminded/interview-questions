import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { IQuestion } from '../../../models/data.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

<<<<<<< HEAD
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
=======
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has the title of wall', () => {
    const element = fixture.debugElement.query(By.css('h1'));
    const title = element.nativeElement.textContent;
    expect(title).toBe('Questions Wall');
  });

  it('should renders 20 questions when we have 20 Questions', () => {
    const list: IQuestion[] = [];

    for (let index = 0; index < 20; index++) {
      const element: IQuestion = {
        id: 'id' + index,
        question: 'Dummy item',
        answers: [{ answer: 'This is a demo answer' }],
        date: '2020-08-10T19:07:28.795Z',
        categories: [{ category: 'Demo category' }],
      };

      list.push(element);
    }

    component.questions = list;
    fixture.detectChanges();

    const questions = fixture.debugElement.queryAll(By.css('.card'));
    expect(questions.length).toBe(20);
  });
>>>>>>> b1437fd472113b64ea5f4c86f108702d49fd3fed
});
