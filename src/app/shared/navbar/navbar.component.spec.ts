import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { ICategory } from '../../models/data.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

<<<<<<< HEAD
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
=======
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to home', () => {
    let elements = fixture.debugElement.queryAll(By.css('a'));
    const count = elements.filter(
      (element) => element.nativeElement.textContent === 'Home'
    ).length;

    expect(count).toBe(1);
  });

  it('should have a link to New Question', () => {
    let elements = fixture.debugElement.queryAll(By.css('a'));
    const count = elements.filter(
      (element) => element.nativeElement.textContent === 'New Question +'
    ).length;

    expect(count).toBe(1);
  });

  /*it('should have at least one category', () => {
    const categories: ICategory[] = [
      { category: 'My Category one' },
      { category: 'My Category two' },
    ];

    component.categories = categories;
    fixture.detectChanges();

    let elements = fixture.debugElement.queryAll(By.css('a'));
    const count = elements.filter(
      (element) => element.nativeElement.textContent === 'New Question +'
    ).length;

    expect(count).toBe(1);
  });*/
>>>>>>> b1437fd472113b64ea5f4c86f108702d49fd3fed
});
