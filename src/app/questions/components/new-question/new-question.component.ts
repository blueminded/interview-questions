import { Component, OnInit } from '@angular/core';

// Model
import { ICategory, IQuestion } from '../../../models/data.model';

// Services
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css'],
})
export class NewQuestionComponent implements OnInit {
  isNewCategory: Boolean = true;
  categories: Array<ICategory>;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.categories = this.questionService.getCategories();
  }

  checkCategory() {
    this.isNewCategory = !this.isNewCategory;
  }

  categoryChange(category: string) {
    this.isNewCategory = category == 'New category' ? true : false;
  }

  saveQuestion(question: string) {
    // this.questionService.saveQuestion(question);
  }
}
