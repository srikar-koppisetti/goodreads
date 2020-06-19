import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
  removeFromReadingList
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {

  books: ReadingListBook[];
  /**
   * In order to unsubscribe observables I am creating individual subscription objects. This is because there are just two subscriptions in this component.
   * If there are more subscriptions in the component then we can also use Subject or subsink library to unsubscribe all subscriptions at a time.
   */
  getAllBooksSub = new Subscription();
  snackBarSub = new Subscription();
  displayResults = false;
  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    public snackbar: MatSnackBar
  ) { }

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.getAllBooksSub = this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    this.snackBarSub = this.snackbar.open('New Book Added', 'Undo')
      .onAction()
      .subscribe(() => {
        const item = { ...book, bookId: book['id'] };
        this.store.dispatch(removeFromReadingList({ item }));
      });
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
      this.displayResults = true;
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy() {
    this.getAllBooksSub.unsubscribe();
    this.snackBarSub.unsubscribe();
  }
}
