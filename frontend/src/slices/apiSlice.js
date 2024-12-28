import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({baseUrl})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['BOOKS'],
  endpoints: (builder) => ({})
})