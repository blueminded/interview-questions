import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../../../models/data.model';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../questions/services/question.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
})
export class CategoryDetailComponent implements OnInit {
  category: string = null;
  questions: Array<IQuestion> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.paramMap.get('category_id');
    this.questionService.getQuestions().subscribe((questions) => {
      this.findQuestionsByCategory(questions);
    });
  }

  findQuestionsByCategory(questions: Array<IQuestion>) {
    questions.forEach((element) => {
      element.categories.forEach((category) => {
        if (category.category.includes(this.category)) {
          this.questions.push(element);
        }
      });
    });
  }
}
