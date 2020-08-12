import { Component, OnInit } from '@angular/core';

// Model
import { ICategory, IQuestion, IAnswer } from '../../../models/data.model';

// Services
import { QuestionService } from '../../services/question.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css'],
})
export class NewQuestionComponent implements OnInit {
  singleCategory: ICategory = { id: null, category: null };
  categories: Array<ICategory>;
  answer: IAnswer = { answer: '' };
  questionCategories: Array<ICategory> = [];
  questionAlert: boolean = false;
  categoryAlert: boolean = false;
  question: IQuestion = new IQuestion();

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  categoryChange(category: string) {
    this.questionCategories.push({ category });
  }

  saveQuestion() {
    if (this.inputValidate()) {
      this.answer.date =
        this.answer.answer !== '' ? new Date().toDateString() : null;
      this.question.date = new Date().toDateString();
      this.question.answers.push(this.answer);
      this.question.categories = this.questionCategories;

      Swal.fire({
        title: 'Wait',
        text: 'Saving information',
        icon: 'info',
        allowOutsideClick: false,
      });

      this.questionService.saveQuestion(this.question).subscribe((response) => {
        this.finishSave();
      });
      this.questionService.addCategory(this.questionCategories); // Validar cuando agregar categoría y cuando no.
    }
  }

  private finishSave() {
    Swal.fire({
      title: 'Saved!',
      text: false
        ? 'Question updated successfully'
        : 'Question created successfully',
      icon: 'success',
    }).then((resp) => {
      if (resp.value) {
        this.router.navigate(['']);
      }
    });
  }

  removeCategory(index: number) {
    this.questionCategories.splice(index, 1);
  }

  addNewCategory(category: string) {
    if (category && category.split(' ').join('')) {
      this.questionCategories.push({ category });
    }
  }

  inputValidate(): boolean {
    if (!this.question.question) {
      this.questionAlert = true;
      return false;
    }
    if (!this.questionCategories.length) {
      this.categoryAlert = true;
      return false;
    }
    return true;
  }
}
