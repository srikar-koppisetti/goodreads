## CODE REVIEW

#### Problems:
* When a user searches for a book the results are displayed. Now the user tries to search a new book by clearing the input field completely the results also get cleared. The results are displayed based on input field value. Instead the results should displayed based on results response.
* 2 unit tests are failing.
* Actions have been created for reading-list but no corresponding reducers are defined.

#### Accessibility Issues:
* I used Lighthouse in chrome dev tools and found many issues first all buttons don't have accessibility information.
* All images (in search result books and reading list books) don't have alt tags.
* Input search book field doesn't have label.
* Color contrast, it can be fixed by changing colors which I will relay on UX team. If not will use color contrast tools for best contrast results.

#### Improvements:
* Displaying errors - If no books are found or the search is invalid. This will improve user experience.
* Unsubscribing observable subscriptions. This will prevent memory leak in the application.
* Code coverage is not more than 90%. Increase in code coverage will increase code correctness.