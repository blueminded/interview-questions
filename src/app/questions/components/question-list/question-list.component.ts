import { Component, OnInit, Input } from '@angular/core';
import { IQuestion } from '../../../models/data.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit {
  @Input() items: IQuestion[];

  constructor() {}

  ngOnInit(): void {}
}
