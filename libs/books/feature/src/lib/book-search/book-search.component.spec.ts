import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule, createBook } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { getAllBooks, addToReadingList } from '@tmo/books/data-access';
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

  it('should test addBookToReadingList() when book added', () => {
    const newBook = createBook('HTML');
    spyOn(store, 'dispatch').and.callFake(() =>{});
    component.addBookToReadingList(newBook);
    expect(store.dispatch).toBeCalledWith(addToReadingList({book: newBook}));
  });

});
