import type { IBookByIdResponse} from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://library-backend-project.vercel.app' }),
  tagTypes: ['books'],
  endpoints: (builder) => ({
    getBooks : builder.query({
        query: ()=> "/api/books",
        providesTags: ['books'],
    }),
    getBookById: builder.query<IBookByIdResponse, string>({
      query: (id: string) => `/api/books/${id}`,
      providesTags: ['books'],
    }),
    createBook : builder.mutation({
        query: (bookData) => ({
        url: "/api/books",
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),
    postBorrow : builder.mutation({
        query: (finalData) => ({
        url: "/api/borrow",
        method: 'POST',
        body: finalData,
      }),
      invalidatesTags: ["books"],
    }),
    getBorrowedBooks : builder.query({
        query: ()=> "/api/borrow",
        providesTags: ['books'],
    }),
    updateBook: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/api/books/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['books'],
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/api/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books'],
    }),                                         


    


  }),
})

export const { useGetBooksQuery , useCreateBookMutation, useDeleteBookMutation ,useGetBookByIdQuery,useUpdateBookMutation,usePostBorrowMutation,useGetBorrowedBooksQuery} = baseApi