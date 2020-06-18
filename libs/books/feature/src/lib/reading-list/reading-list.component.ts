import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, addToReadingList } from '@tmo/books/data-access';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnDestroy {
  readingList$ = this.store.select(getReadingList);
  snackBarSub = new Subscription();

  constructor(private readonly store: Store,
              public snackbar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.snackBarSub = this.snackbar.open('Book Removed', 'Undo')
    .onAction()
    .subscribe(() => {
      this.store.dispatch(addToReadingList({ book: item }));
    });
  }

  ngOnDestroy() {
    this.snackBarSub.unsubscribe();
  }

}
