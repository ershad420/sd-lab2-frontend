// import type { RootState } from "@/app/store";
// import type { Ibook } from "@/types";
// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// interface IinitialState {
//     books: Ibook[],
// }
// const initialState : IinitialState = {
//     books:[
//         {
//             id: "12345",
//             title: "The Theory of Everything",
//             author: "Stephen Hawking",
//             genre: "SCIENCE",
//             isbn: "9780553380163",
//             description: "An overview of cosmology and black holes.",
//             copies: 5,
//             available: true
//         },
//     ],
// };
// const bookSlice = createSlice({
//   name: 'books',
//   initialState,
//   reducers: {
//     addBook: (state,action : PayloadAction<Ibook>)=>{
//         const id="1234567"
//         const book = {
//             ...action.payload,
//             id
//         }
//         state.books.push(book)
//     },

//     deleteBook: (state,action : PayloadAction<string>)=>{
//        state.books= state.books.filter((book)=> book.id!=action.payload)
//     }
//   },
// })

// export const {addBook,deleteBook} = bookSlice.actions;
// export const selectBook = (state : RootState) => state.books.books;
// export default bookSlice.reducer;