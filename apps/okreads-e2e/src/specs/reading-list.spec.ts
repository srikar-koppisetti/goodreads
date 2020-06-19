import { $, browser, ExpectedConditions, $$ } from 'protractor';
import { expect } from 'chai';

describe('When: I use the reading list feature', () => {
  xit('Then: I should see my reading list', async () => {
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

  it('Then: I should see books added to the reading list', async () => {
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
      expect(readingItem.length).to.be.greaterThan(1, 'At least one book');
    }
  });

  it('Then: I should see my reading list and mark book a read', async () => {
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
    }

    // go to reading list
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

    // mark a book as read
    const finishReadingItemButtonsBefore = await $$('[data-testing="finished-reading-button"]');
    await finishReadingItemButtonsBefore[0].click();
    const finishReadingItemButtonsAfter = await $$('[data-testing="finished-reading-button"]');
    expect(finishReadingItemButtonsBefore.length).to.greaterThan(finishReadingItemButtonsAfter.length);

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });


  it('Then: I should see my reading list and mark book a read', async () => {
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
    }
    

    const wantToReadButtonsBefore = await $$('[data-testing="book-item"] button:not(:disabled)');

    // go to reading list
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    const readingItemBefore = await $$('[data-testing="reading-list-item"]');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );

    const removeReadingItemButtons = await $$('[data-testing="reamove-book-button"]');
    await removeReadingItemButtons[0].click();


    const readingItemAfter = await $$('[data-testing="reading-list-item"]');
    expect(readingItemBefore.length).to.greaterThan(readingItemAfter.length);


  });
});
