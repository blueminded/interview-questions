import { Component, OnInit } from '@angular/core';
import { IQuestion, IAnswer } from '../../../models/data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  question : IQuestion = new IQuestion();
  questionId : string;
  newAnswer:  IAnswer = { answer: '' };
  answerAlert: boolean = false;
  answerAdded: boolean = false;

  constructor(
    private activatedRoute : ActivatedRoute,
    private questionService : QuestionService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.questionId = this.activatedRoute.snapshot.paramMap.get('question_id');
    this.questionService.getQuestionById(this.questionId)
    .subscribe(answer => {
      if (answer) {
        this.question = answer;
      } else {
        this.router.navigate(['']);
      }
    });
  }

  addAnswer() { 
    if (this.newAnswer.answer) {
      this.newAnswer.date = new Date().toDateString();
      this.question.answers.push(this.newAnswer);
      this.questionService.addNewAnswer(this.question, this.questionId);
      this.router.navigate(['']);
    } else {
      this.answerAlert = true;
    }
    console.log(this.newAnswer);
  }

  deleteQuestion() {
    this.questionService.deleteQuestion(this.questionId)
    .subscribe(deleted => {
      console.log(deleted);
    });
    this.router.navigate(['']);
  }

  editQuestion() {
    this.router.navigate(['/edit', this.questionId]);
  }

  searchCategory(category : string) {
    this.router.navigate(['/categories', category]);
  }

}
