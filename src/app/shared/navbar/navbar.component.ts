import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../categories/services/categories.service';
import { ICategory } from '../../models/data.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  categories: ICategory[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((resp) => {
      this.categories = resp;
    });
  }
}
