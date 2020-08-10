import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../questions/services/question.service';
import { IQuestion } from '../../models/data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  questionList: IQuestion[] = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getRecentQuestions().subscribe((resp) => {
      this.questionList = resp;
    });
  }
}
