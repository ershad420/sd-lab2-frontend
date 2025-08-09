Initial setup:

<pre>
$ npm install
$ npm i react-icons
$ npx shadcn@latest add tooltip
$ npm install react-hook-form
$ npx shadcn@latest add alert-dialog
$ npm install sonner
$ npm i -D daisyui@latest
$ npm run dev
</pre>

API's :

1. Creating New book : post-> /api/books
2. Getting All books : get-> /api/books
3. Getting book by id : get-> /api/books/:bookId
4. Updating book: put-> /api/books/:bookId
5. Deleting book: delete-> /api/books/:bookId
6. Borrowing book: post-> /api/borrow
7. Getting total borrowed books group by book_id: get->/api/borrow

Features :

1. CRUD operation.
2. 3 layer validation (typescript,mongoose and zod)
3. Custom Error handeling
4. Getting total borrowed book by book Id.
5. Automatic book availability update based on borrowed quantity
6. Separate controllers, routes, models, and validation schemas


                                     C211012  SYED ARMAN ALAM C211012
