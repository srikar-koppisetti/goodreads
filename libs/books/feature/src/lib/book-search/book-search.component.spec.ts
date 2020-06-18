import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule, createBook } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { clearSearch, getAllBooks, searchBooks } from '@tmo/books/data-access';
import { MemoizedSelector } from '@ngrx/store';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: MockStore;
  let getBooks: MemoizedSelector<any, any>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
      providers: [provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    getBooks = store.overrideSelector(
      getAllBooks,
      [createBook('JS'), createBook('TS'), createBook('Angular')]
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should test searchBooks() when input is empty', () => {
    spyOn(store, 'dispatch').and.callFake(() =>{});
    const term = component.searchForm.controls['term'];
    term.setValue('');
    component.searchBooks();
    expect(component.displayResults).toBeFalsy();
    expect(store.dispatch).toBeCalledWith(clearSearch());
  });

  it('Should test searchBooks() when input has a value', () => {
    const searchTerm = 'english';
    spyOn(store, 'dispatch').and.callFake(() =>{});
    const term = component.searchForm.controls['term'];
    term.setValue(searchTerm);
    component.searchBooks();
    expect(component.displayResults).toBeTruthy();
    expect(store.dispatch).toBeCalledWith(searchBooks({term: searchTerm}));
  });

  it('Should test autoSearchOnValueChange() when input is empty', fakeAsync(() => {
    const searchTerm = '';
    spyOn(store, 'dispatch').and.callFake(() =>{});
    const term = component.searchForm.controls['term'];
    term.setValue(searchTerm);
    tick(1000);
    expect(component.displayResults).toBeFalsy();
    expect(store.dispatch).toBeCalledWith(clearSearch());
  }));

  it('Should test autoSearchOnValueChange() when input has a value', fakeAsync(() => {
    const searchTerm = 'english';
    spyOn(store, 'dispatch').and.callFake(() =>{});
    const term = component.searchForm.controls['term'];
    term.setValue(searchTerm);
    tick(1000);
    expect(component.displayResults).toBeTruthy();
    expect(store.dispatch).toBeCalledWith(searchBooks({term: searchTerm}));
  }));
});
