import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { IQuestion, IAnswer } from '../../../models/data.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'],
})
export class QuestionDetailComponent implements OnInit {
  question: IQuestion;
  answers: IAnswer[];
  newAnswer: string;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.questionService.getQuestion(id).subscribe((resp) => {
      this.question = resp;
      console.log(this.question);
    });

    this.questionService.getAnswersQuestion(id).subscribe((resp) => {
      this.answers = resp;
      console.log(this.answers);
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
        this.questionService
          .deleteQuestion(this.question)
          .subscribe((response) => {
            console.log(response);
            this.router.navigate(['']);
          });
      }
    });
  }

  private showCompleteAlert() {
    Swal.fire({
      title: this.question.title,
      text: 'Question deleted successfully',
      icon: 'success',
    });
  }

  private showLoadingAlert() {
    Swal.fire({
      title: 'Wait',
      text: 'Saving information',
      icon: 'info',
      allowOutsideClick: false,
    });

    Swal.showLoading();
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
