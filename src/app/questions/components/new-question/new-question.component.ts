import { Component, OnInit } from '@angular/core';

// Model
import { ICategory, IQuestion, IAnswer } from '../../../models/data.model';

// Services
import { QuestionService } from '../../services/question.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { cleanCategories } from '../../../helpers/helpers';

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
  edit = false;
  titleForm = '¡ Create your own question !';
  questionId = null;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('question_id');

    if (id) {
      this.edit = true;
      this.questionId = id;
      this.titleForm = 'Edit the question';
      this.questionService.getQuestionById(id).subscribe((response) => {
        if (response) {
          this.question = response;
          this.questionCategories = response.categories;
          this.answer = response.answers[0];
        } else {
          this.router.navigate(['']);
        }
      });
    }
    this.questionService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  categoryChange(category: string) {
    this.updateQuestionCategories(category.toLocaleLowerCase());
  }

  private updateQuestionCategories(category: string) {
    this.questionCategories.push({ category });
    this.questionCategories = cleanCategories(
      this.questionCategories,
      'category'
    );
  }

  saveQuestion() {
    if (this.inputValidate()) {
      if (this.edit) {
        this.updateQuestion();
      } else {
        this.createQuestion();
      }
      this.questionService.addCategory(this.questionCategories);
    }
  }

  private updateQuestion() {
    this.question.answers[0] = this.answer;
    this.question.categories = this.questionCategories;

    Swal.fire({
      title: 'Wait',
      text: 'Saving information',
      icon: 'info',
      allowOutsideClick: false,
    });

    this.questionService
      .updateQuestion(this.question, this.questionId)
      .subscribe((response) => {
        this.finishSave();
      });
  }

  private createQuestion() {
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
  }

  private finishSave() {
    Swal.fire({
      title: 'Saved!',
      text: this.edit
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
      this.updateQuestionCategories(category.toLocaleLowerCase());
    }
  }

  inputValidate(): boolean {
    if (!this.question.question) {
      this.questionAlert = true;
      return false;
    }

    this.categoryAlert = false;
    if (!this.questionCategories.length) {
      this.categoryAlert = true;
      return false;
    }
    return true;
  }
}
