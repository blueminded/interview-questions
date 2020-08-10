import { Component, OnInit } from '@angular/core';

// Model
import { ICategory, IQuestion, IAnswer } from '../../../models/data.model';

// Services
import { QuestionService } from '../../services/question.service';
import { CategoriesService } from '../../../categories/services/categories.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css'],
})
export class NewQuestionComponent implements OnInit {
  isNewCategory = true;
  categories: Array<ICategory>;
  title: string;
  answer: string;
  newCategory: string;
  categoryId: string = 'New category';
  imageUrl: string;
  id: string;
  edit = false;
  defaultAnswer: IAnswer;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.id = id;
      this.edit = true;
      this.questionService.getQuestion(this.id).subscribe((resp) => {
        this.title = resp.title;
        this.imageUrl = resp.img_url;
        this.categoryId = resp.categoryId;
        this.categoryChange(this.categoryId);
      });

      this.questionService
        .getDefaultAnswerQuestion(this.id)
        .subscribe((resp) => {
          this.defaultAnswer = resp;
          this.answer = this.defaultAnswer.content;
        });
    }

    this.categoriesService.getCategories().subscribe((resp) => {
      this.categories = resp;
    });
  }

  handleForm(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      title: 'Wait',
      text: 'Saving information',
      icon: 'info',
      allowOutsideClick: false,
    });

    Swal.showLoading();

    if (this.edit) {
      if (this.isNewCategory) {
        this.saveCategory();
      } else {
        this.updateQuestion();
      }
    } else {
      if (this.isNewCategory) {
        this.saveCategory();
      } else {
        this.saveQuestion();
      }
    }
  }

  categoryChange(category: string) {
    this.isNewCategory = category === 'New category' ? true : false;

    if (!this.isNewCategory) {
      this.newCategory = '- - -';
    } else {
      this.newCategory = '';
    }
  }

  private saveCategory() {
    const newCategory: ICategory = {
      name: this.newCategory,
    };

    this.categoriesService.saveCategory(newCategory).subscribe((resp) => {
      this.categoryId = resp.id;

      if (this.edit) {
        this.updateQuestion();
      } else {
        this.saveQuestion();
      }
    });
  }

  private saveQuestion() {
    let question: IQuestion = {
      title: this.title,
      excerpt: this.answer.substr(0, 36) + '...',
      categoryId: this.categoryId,
      img_url: this.imageUrl,
    };

    this.questionService.saveQuestion(question).subscribe((resp) => {
      question = resp;
      this.saveAnswer(question);
    });
  }

  private updateQuestion() {
    let question: IQuestion = {
      id: this.id,
      title: this.title,
      excerpt: this.answer.substr(0, 36) + '...',
      categoryId: this.categoryId,
      img_url: this.imageUrl,
    };

    this.questionService.updateQuestion(question).subscribe((resp) => {
      question = resp;
      this.updateAnswer(question);
    });
  }

  private updateAnswer(question: IQuestion) {
    let answer: IAnswer = {
      id: this.defaultAnswer.id,
      questionId: question.id,
      content: this.answer,
    };

    this.questionService.updateDefaultAnswer(answer).subscribe((resp) => {
      answer = resp;
      this.finishSave();
    });
  }

  private saveAnswer(question: IQuestion) {
    let answer: IAnswer = {
      questionId: question.id,
      content: this.answer,
    };

    this.questionService.saveAnswer(answer).subscribe((resp) => {
      answer = resp;
      this.finishSave();
    });
  }

  private finishSave() {
    Swal.fire({
      title: this.title,
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
}
