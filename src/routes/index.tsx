import App from "@/App";
import AddBook from "@/pages/Add Book/AddBook";
import Books from "@/pages/All Books/Books";
import BookDetails from "@/pages/Book Details/BookDetails";
import BorrowBook from "@/pages/Borrow Book/BorrowBook";
import BorrowSummary from "@/pages/Borrow Summary/BorrowSummary";
import Home from "@/pages/Home/Home";
import UpdateBook from "@/pages/Update Book/UpdateBook";

import {
  createBrowserRouter
} from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
          { index: true,
            Component: Home,
          },
          { path: "/books", 
            Component: Books 
          },
          { path: "/books/:id", 
            Component: BookDetails, 
          }, 
          { path: "/create-book", 
            Component: AddBook 
          },
          { path: "/borrow/:id", 
            Component: BorrowBook
          },
          { path: "/borrow-summary", 
            Component: BorrowSummary
          },
          { path: "/edit-book/:id", 
            Component: UpdateBook
          },
        ],
  },
]);

export default router;