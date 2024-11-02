import { apiSlice } from "./apiSlice";
const BOOKS_URL = '/api/books'

export const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookDetail: builder.query({
      providesTags: ['BOOKS'],
      query: (bookId) => {
        return {
          url: `${BOOKS_URL}/${bookId}`,
          method: 'GET'
        }
      }}),
    editBook: builder.mutation({
      invalidatesTags: ['BOOKS'],
      query: (data) => {
        return {
          url: `${BOOKS_URL}/${data._id}`,
          method: 'PUT',
          body: data
        }
      }}),
    deleteBook: builder.mutation({
      invalidatesTags: ['BOOKS'],
      query: (bookId) => {
        return {
          url: `${BOOKS_URL}/${bookId}`,
          method: 'DELETE'
        }
      }}),
    createBook: builder.mutation({
      invalidatesTags: ['BOOKS'],
      query: (data) => {
        return {
          url: `${BOOKS_URL}`,
          method: 'POST',
          body: data
        }
      }}),
    getBooks: builder.query({
      providesTags: ['BOOKS'],
      query: (params) => {
        const newParams = {
          limit: `${params.limit}`,
          page: `${params.page}`
        }
        if(params.category) newParams.category = params.category
        return {
          url: `${BOOKS_URL}`,
          method: 'GET',
          params: newParams
        }
      }
    })
  })
})

export const { useGetBooksQuery, useLazyGetBooksQuery, useGetBookDetailQuery, useCreateBookMutation, useEditBookMutation, useDeleteBookMutation } = bookApiSlice