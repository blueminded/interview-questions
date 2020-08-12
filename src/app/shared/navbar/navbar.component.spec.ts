import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { CategoriesService } from '../../categories/services/categories.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let categoriesServiceMock: any;

  beforeEach(async(() => {
    categoriesServiceMock = jasmine.createSpyObj('CategoriesService', [
      'getCategories',
    ]);

    categoriesServiceMock.getCategories.and.returnValue({
      subscribe: () => {
        return [];
      },
    });

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: CategoriesService, useValue: categoriesServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should navigate to Create new question', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    const elements = fixture.debugElement.queryAll(By.css('a'));
    elements.forEach((button) => {
      const buttonElement: HTMLButtonElement = button.nativeElement;
      if (buttonElement.textContent === 'New Question') {
        buttonElement.click();
      }
    });
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      router.createUrlTree(['/new-question']),
      { skipLocationChange: false, replaceUrl: false }
    );
  });
});
