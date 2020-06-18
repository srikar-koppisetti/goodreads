import { $, browser, ExpectedConditions, $$, by } from 'protractor';
import { expect } from 'chai';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should see my reading list with Items when books added', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // search for a book
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const books = await $$('[data-testing="book-item"]');
    expect(books.length).to.be.greaterThan(1, 'At least one book');

    const wantToReadButtons = await $$('[data-testing="book-item"] button:not(:disabled)');

    // add books to reading list
    if (await wantToReadButtons.length > 0) {
      await wantToReadButtons[0].click();

      // toggle reading list
      const readingListToggle = await $('[data-testing="toggle-reading-list"]');
      await readingListToggle.click();
      const readingItem = await await $$('[data-testing="reading-list-item"]');
      expect(readingItem.length).to.be.greaterThan(1, 'At least one book');

      await browser.wait(
        ExpectedConditions.textToBePresentInElement(
          $('[data-testing="reading-list-container"]'),
          'My Reading List'
        )
      );
    }

  });

  it('Then: I should see my reading list with one less item when Item removed', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // search for a book
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const books = await $$('[data-testing="book-item"]');
    expect(books.length).to.be.greaterThan(1, 'At least one book');

    const wantToReadButtons = await $$('[data-testing="book-item"] button:not(:disabled)');

    // add books to reading list
    if (await wantToReadButtons.length > 0) {
      await wantToReadButtons[0].click();

      // toggle reading list
      const readingListToggle = await $('[data-testing="toggle-reading-list"]');
      await readingListToggle.click();
      const readingItem = await $$('[data-testing="reading-list-item"]');
      await browser.wait(
        ExpectedConditions.textToBePresentInElement(
          $('[data-testing="reading-list-container"]'),
          'My Reading List'
        )
      );
      expect(readingItem.length).to.be.greaterThan(1, 'At least one book');

      // remove item
      const removeReadingItemButton = await $$('[data-testing="reading-list-item"] button');
      const countOfReadingItemBeforeRemove = removeReadingItemButton.length;
      await removeReadingItemButton[countOfReadingItemBeforeRemove - 1].click();
      const removeReadingItemButtonAfter = await $$('[data-testing="reading-list-item"] button');
      const countOfReadingItemAfterRemove = removeReadingItemButtonAfter.length;
      expect(countOfReadingItemBeforeRemove).to.greaterThan(countOfReadingItemAfterRemove);

    }
  });

  it('Then: I should see item not added to reading list on Undoing New book added to reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // search for a book
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const booksBefore = await $$('[data-testing="book-item"]');
    expect(booksBefore.length).to.be.greaterThan(1, 'At least one book');

    const wantToReadButtons = await $$('[data-testing="book-item"] button:not(:disabled)');

    // add books to reading list and undo it
    if (await wantToReadButtons.length > 0) {
      await wantToReadButtons[0].click();

      // undo book added to reading list
      const undoButton = await browser.driver.findElement(by.css('.mat-simple-snackbar-action .mat-button'));
      await undoButton.click();
      const booksAfter = await $$('[data-testing="book-item"]');
      expect(booksBefore.length).to.equals(booksAfter.length);
    }
  });

  it('Then: I should see item not removed from reading list on Undoing Remove book', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // search for a book
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const booksBefore = await $$('[data-testing="book-item"]');
    const wantToReadButtons = await $$('[data-testing="book-item"] button:not(:disabled)');

    if (await wantToReadButtons.length > 0) {
      // add books to reading list
      await wantToReadButtons[0].click();

      // toggle reading list
      const readingListToggle = await $('[data-testing="toggle-reading-list"]');
      await readingListToggle.click();
      const readingItemBefore = await $$('[data-testing="reading-list-item"]');
      await browser.wait(
        ExpectedConditions.textToBePresentInElement(
          $('[data-testing="reading-list-container"]'),
          'My Reading List'
        )
      );

      // remove item
      const removeReadingItemButton = await $$('[data-testing="reading-list-item"] button');
      const countOfReadingItemBeforeRemove = removeReadingItemButton.length;
      await removeReadingItemButton[countOfReadingItemBeforeRemove - 1].click();

      // undo book added to reading list
      const undoButton = await browser.driver.findElement(by.css('.mat-simple-snackbar-action .mat-button'));
      await undoButton.click();

      const readingItemAfter = await $$('[data-testing="reading-list-item"]');
      expect(readingItemBefore.length).to.equals(readingItemAfter.length);

    }
  });

});
