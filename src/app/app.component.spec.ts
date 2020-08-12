import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CategoriesService } from './categories/services/categories.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, NavbarComponent],
      providers: [
        { provide: CategoriesService, useClass: MockCategoriesService },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'interview-questions'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('interview-questions');
  });

  /*it('should render title in h1', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    console.log('AQUI');
    expect(compiled.querySelector('.container h1').textContent).toContain(
      'Recent questions'
    );
  });*/
});

class MockCategoriesService {
  constructor() {}

  getCategories() {
    return of([]);
  }
}
