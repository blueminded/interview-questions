import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { IQuestion, IAnswer, ICategory } from '../../../models/data.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoriesService } from '../../../categories/services/categories.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'],
})
export class QuestionDetailComponent implements OnInit {
  question: IQuestion;
  answers: IAnswer[];
  newAnswer: string;
  category: ICategory;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private categoryService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.questionService.getQuestion(id).subscribe((resp) => {
      this.question = resp;

      this.getCategory(this.question.categoryId);
    });

    this.questionService.getAnswersQuestion(id).subscribe((resp) => {
      this.answers = resp;
    });
  }

  private getCategory(categoryId: string) {
    this.categoryService.getCategory(categoryId).subscribe((resp) => {
      this.category = resp;
    });
  }

  editQuestion() {
    this.router.navigate(['/questions', this.question.id, 'edit']);
  }

  deleteQuestion() {
    Swal.fire({
      title: '¿Are you sure?',
      text: `Do you really want to delete this question?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        const questionId = this.question.id;

        let total = this.answers.length;

        Swal.fire({
          title: 'Wait',
          text: 'Saving information',
          icon: 'info',
          allowOutsideClick: false,
        });

        Swal.showLoading();

        this.answers.forEach((answer) => {
          this.questionService
            .deleteAnswerQuestion(questionId, answer.id)
            .subscribe((resp) => {
              total--;

              if (total === 0) {
                this.questionService
                  .deleteQuestion(this.question)
                  .subscribe((response) => {
                    Swal.fire({
                      title: 'Information',
                      text: 'Question deleted successfully',
                      icon: 'success',
                    }).then((r) => {
                      if (r.value) {
                        this.router.navigate(['']);
                      }
                    });
                  });
              }
            });
        });
      }
    });
  }

  addNewAnswer(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const answer: IAnswer = {
      questionId: this.question.id,
      content: this.newAnswer,
    };

    this.questionService.saveAnswer(answer).subscribe((resp) => {
      this.answers.push(resp);
      form.reset();
    });
  }
}
