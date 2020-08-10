import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { IQuestion, ICategory } from '../../../models/data.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
})
export class CategoryDetailComponent implements OnInit {
  questionList: IQuestion[];
  currentCategory: ICategory;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['category_id'];

      this.categoriesService.getCategory(id).subscribe((resp) => {
        this.currentCategory = resp;
      });

      this.categoriesService.getCategoryQuestions(id).subscribe((resp) => {
        this.questionList = resp;
      });
    });
  }
}
