import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule, createBook, createReadingListItem } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { removeFromReadingList, getReadingList } from '@tmo/books/data-access';
import { MemoizedSelector } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let store: MockStore;
  let readingList: MemoizedSelector<any, any>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
      providers: [provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    readingList = store.overrideSelector(
      getReadingList,
      [createReadingListItem('ENG-111')]
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test removeFromReadingList() when book added', () => {
    const readingListItem = createReadingListItem('ENG-112');
    spyOn(store, 'dispatch').and.callFake(() =>{});
    component.removeFromReadingList(readingListItem);
    expect(store.dispatch).toBeCalledWith(removeFromReadingList({ item: readingListItem }));
  });
});
