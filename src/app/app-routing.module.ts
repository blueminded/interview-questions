import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewQuestionComponent } from './questions/components/new-question/new-question.component';
import { CategoryDetailComponent } from './categories/components/category-detail/category-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories/:category_id', component: CategoryDetailComponent },
  { path: 'new-question', component: NewQuestionComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
