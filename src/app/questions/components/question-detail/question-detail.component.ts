import { Component, OnInit } from '@angular/core';
import { IQuestion, IAnswer } from '../../../models/data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'],
})
export class QuestionDetailComponent implements OnInit {
  question: IQuestion = new IQuestion();
  questionId: string;
  newAnswer: IAnswer = { answer: '' };
  answerAlert: boolean = false;
  answerAdded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionId = this.activatedRoute.snapshot.paramMap.get('question_id');
    this.questionService
      .getQuestionById(this.questionId)
      .subscribe((answer) => {
        if (answer) {
          this.question = answer;
        } else {
          this.router.navigate(['']);
        }
      });
  }

  addAnswer(form: NgForm) {
    if (this.newAnswer.answer) {
      Swal.fire({
        title: 'Wait',
        text: 'Saving information',
        icon: 'info',
        allowOutsideClick: false,
      });

      this.newAnswer.date = new Date().toDateString();

      const answer: IAnswer = {
        date: this.newAnswer.date,
        answer: this.newAnswer.answer,
      };

      this.question.answers.push(answer);
      this.questionService
        .addNewAnswer(this.question, this.questionId)
        .subscribe((response) => {
          form.reset();

          Swal.fire({
            title: 'Information',
            text: 'New answer added',
            icon: 'success',
          });
        });
    } else {
      this.answerAlert = true;
    }
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
        Swal.fire({
          title: 'Wait',
          text: 'Deleting information',
          icon: 'info',
          allowOutsideClick: false,
        });

        this.questionService
          .deleteQuestion(this.questionId)
          .subscribe((deleted) => {
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
  }

  editQuestion() {
    this.router.navigate(['/edit', this.questionId]);
  }

  searchCategory(category: string) {
    this.router.navigate(['/categories', category]);
  }
}
