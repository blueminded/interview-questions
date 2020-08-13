import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../models/data.model';
import { QuestionService } from '../../questions/services/question.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  categories: Array<ICategory> = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getCategories().subscribe((allCategories) => {
      this.categories = allCategories;
    });
  }
}
